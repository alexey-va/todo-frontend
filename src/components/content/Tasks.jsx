import {
  allTasks,
  authed, backend,
  credentials,
  lists,
  search
} from "../../Signals.jsx";
import { useState } from "react";
import TaskCreator from "../other/TaskCreator.jsx";
import {
  fromTimestamp,
  fromTimestampToStringWithouTZ,
  serializeDate,
} from "../../Utils.jsx";

export default function Tasks({ getAddList, predicate, title, startDate, defaultList, taskContainer }) {
  let seen = false;

  const [selectedTask, setSelectedTask] = useState(-1);

  const handleTaskComplete = (id) => {
    //console.log("Update "+id)
    fetch(`${backend.value}user/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(credentials.value.login + ":" + credentials.value.password),
      },
      body: JSON.stringify({
        id: id,
        completed: !allTasks.value.find((i) => i.id === id).completed,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          authed.value = false;
          return null;
        }
        return response.json();
      })
      .then((data) => {
        let task = data.task;
        //console.log("Updated: ",task)
        let result = [...allTasks.value];
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === task.id) {
            //console.log("Found match")
            result[i] = task;
            //console.log("Result: ",result)
            allTasks.value = result.sort((a, b) => a.id - b.id);
            break;
          }
        }
        //console.log("Result: ",allTasks.value)
      });
  };

  const handleTaskSelect = (id) => {
    setSelectedTask(selectedTask === id ? -1 : id);
  };

  function handleTaskChange(id, isDelete) {
    let start = document.getElementById(`start${id}`).value;
    let end = document.getElementById(`end${id}`).value;
    let list = document.getElementById(`list${id}`).value;
    let newName = document.getElementById(`title${id}`).value;
    if(newName.length === 0) return;
    let startDateTime = new Date(start);
    let endDateTime = new Date(end);
    let upcoming = allTasks.value.find((i) => i.id === id).upcoming;
    let completed = allTasks.value.find((i) => i.id === id).completed;

    let serializedStart = serializeDate(startDateTime);
    let serializedEnd = serializeDate(endDateTime);

    fetch(`${backend.value}user/tasks?task_list=${list}`, {
      method: isDelete ? "DELETE" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(credentials.value.login + ":" + credentials.value.password),
      },
      body: JSON.stringify({
        id: id,
        title: newName,
        list: list,
        startDate: serializedStart,
        endDate: serializedEnd,
        completed: completed,
        upcoming: upcoming,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          authed.value = false;
          return null;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (isDelete) {
          let tasks = [...allTasks.value].filter((i) => i.id !== id);
          allTasks.value = tasks.sort((a, b) => a.id - b.id);
        } else {
          let task = data.task;
          let result = [...allTasks.value];
          //console.log(data);
          for (let i = 0; i < result.length; i++) {
            if (result[i].id === task.id) {
              result[i] = task;
              break;
            }
          }
          allTasks.value = result.sort((a, b) => a.id - b.id);
        }
      });
  }

  return (
    <div className="no-scrollbar flex h-full w-full flex-col overflow-scroll rounded-md border p-3 text-[1rem]">
      {title ? (
        <>
          <div className="mb-2 text-[1.0rem] font-bold">{title}</div>
        </>
      ) : (
        ""
      )}

      <div className="flex flex-row">
        <div className="flex flex-grow flex-col">
          <div className="relative mb-2">
            <TaskCreator startDate={startDate} setSelectedTask={setSelectedTask} defaultList={defaultList} taskContainer={taskContainer}/>
          </div>
          <div className="no-scrollbar overflow-y-scroll">

            {allTasks.value.map((value) => {
              if (!predicate(value)) {
                return "";
              }

              let isListExists = lists.value.find((i) => i.id === value.list);
              if (!isListExists) return "";

              let isSearchNotMatch =
                search.value.length > 0 &&
                value.title
                  .toLowerCase()
                  .indexOf(search.value.toLowerCase()) === -1;
              if (isSearchNotMatch) return "";

              let hr = seen;
              seen = true;
              return (
                <div key={value.id} className="flex flex-col">
                  {!hr ? "" : <hr className="my-2 w-full max-sm:my-1" />}
                  <div className="ml-2 flex flex-row content-center text-[1rem]">
                    <input
                      type="checkbox"
                      className="mr-2 mt-0.5 w-2.5 cursor-pointer"
                      checked={value.completed}
                      onChange={() => handleTaskComplete(value.id)}
                    />
                    <div
                      className="flex w-full cursor-pointer flex-row"
                      onClick={() => handleTaskSelect(value.id)}
                    >
                      <label className="cursor-pointer">{value.title}</label>
                      <div
                        className={`${
                          selectedTask === value.id ? "rotate-90" : ""
                        } ml-auto mr-4 font-medium transition-all`}
                      >
                        ❯
                      </div>
                    </div>
                  </div>
                  <div className="ml-7 flex flex-row gap-1 text-[0.7rem]  font-semibold">
                    {getAddList(value)}
                  </div>

                  {/* EDITOR */}
                  <div
                    className={`${
                      selectedTask === value.id ? "h-[14rem]" : "h-0"
                    } relative w-full  overflow-y-hidden transition-all`}
                  >
                    <div
                      className={`${
                        selectedTask === value.id ? "" : "-translate-y-[3rem]"
                      } absolute mt-2 flex w-full flex-col gap-2 text-sm transition-all`}
                    >
                      <div className="grid grid-cols-2 gap-2 rounded-md bg-gray-100 p-2">
                        <label
                          htmlFor={`start${value.id}`}
                          className="font-semibold"
                        >
                          Название
                        </label>
                        <input
                          id={`title${value.id}`}
                          className="rounded-md p-1 px-2"
                          type="text"
                          defaultValue={value.title}
                          minLength={1}
                        />

                        <label
                          htmlFor={`start${value.id}`}
                          className="font-semibold"
                        >
                          Время начала
                        </label>
                        <input
                          id={`start${value.id}`}
                          className="rounded-md p-1 px-2"
                          type="datetime-local"
                          defaultValue={fromTimestampToStringWithouTZ(
                            value.startDate,
                          )}
                        />

                        <label
                          htmlFor={`end${value.id}`}
                          className="font-semibold"
                        >
                          Время окончания
                        </label>
                        <input
                          id={`end${value.id}`}
                          className="rounded-md p-1 px-2"
                          type="datetime-local"
                          defaultValue={fromTimestampToStringWithouTZ(
                            value.endDate,
                          )}
                        />

                        <label
                          htmlFor={`list${value.id}`}
                          className="font-semibold"
                        >
                          Список
                        </label>
                        <select
                          name={`list${value.id}`}
                          id={`list${value.id}`}
                          className="rounded-md px-2 py-1"
                          defaultValue={value.list}
                        >
                          {lists.value.map((value) => {
                            return (
                              <option key={value.id} value={value.id}>
                                {value.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex w-full flex-row justify-between gap-6">
                        <button
                          className="flex-grow rounded-md bg-blue-500 px-2 py-1 text-lg text-white"
                          onClick={() => handleTaskChange(value.id, false)}
                        >
                          Изменить
                        </button>
                        <button
                          className="flex-grow rounded-md bg-red-500 px-2 py-1 text-lg text-white"
                          onClick={() => handleTaskChange(value.id, true)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
