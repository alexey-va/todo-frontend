import {
  allTasks,
  authed,
  backend,
  createTaskTitle,
  credentials,
  lists,
} from "../../Signals.jsx";
import { useRef, useState } from "react";
import { serializeDate } from "../../Utils.jsx";

export default function TaskCreator({
  startDate,
  taskContainer,
  setSelectedTask,
  defaultList,
}) {
  const [beginDateInput, setBeginDateInput] = useState();

  const beginDateRef = useRef();
  const endDateRef = useRef();

  let defaultListId = defaultList
    ? defaultList
    : lists.value && lists.value.length > 0
      ? lists.value[0].id
      : 1;

  const now = startDate ? startDate : new Date();
  now.setHours(now.getHours() + 3);
  // Format to match the datetime-local input requirements (YYYY-MM-DDTHH:mm)
  // toISOString() returns a time in UTC, so we create a new date object in the local timezone
  const nowString = now.toISOString().slice(0, 16);
  const inOneHourString = new Date(now.getTime() + 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  let taskContainerId = taskContainer ? taskContainer : 0;
  let active = createTaskTitle.value.id
    ? createTaskTitle.value.id === taskContainerId
    : false;

  const handleEndDateChange = (e) => {
    //console.log("Begin date: ", beginDateInput, "End date: ", e.target.value)
    if (e.target.value < beginDateInput) {
      e.target.value = beginDateInput;
    }
  };

  const hanleBeginDateChange = (e) => {
    //console.log("Begin date: ", e.target.value, "End date: ", document.querySelector("#end").value)
    if (e.target.value > document.querySelector("#end").value) {
      endDateRef.current.value = e.target.value;
    }
    setBeginDateInput(e.target.value);
  };

  const handleCreateTask = () => {
    if (createTaskTitle.value.title.length === 0) return;

    const startInput = beginDateRef.current.value;
    const endInput = endDateRef.current.value;

    let startDate = new Date(startInput);
    let endDate = new Date(endInput);

    console.log("Start: ", startDate, "End: ", endDate);

    startDate.setHours(startDate.getHours());
    endDate.setHours(endDate.getHours());

    const start = serializeDate(startDate);
    const end = serializeDate(endDate);

    const list = document.querySelector("#list").value;
    const upcoming = 0;
    let taskTitle = createTaskTitle.value.title;


    createTaskTitle.value = {
      title: "",
      id: -1,
    };

    fetch(`${backend.value}user/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(credentials.value.login + ":" + credentials.value.password),
      },
      body: JSON.stringify({
        title: taskTitle,
        startDate: start,
        endDate: end,
        completed: false,
        list: list,
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
        let task = data.task;
        let result = [...allTasks.value];
        result.push(task);
        allTasks.value = result.sort((a, b) => a.id - b.id);
      });
  };

  return (
    <>
      <div className="absolute left-2 z-10 text-[1.4rem] font-semibold text-gray-500">
        +
      </div>
      <input
        className="relative w-full rounded-[4px] border px-2 py-1.5 pl-7 text-[1rem]
              outline-0 max-sm:text-[0.85rem]"
        placeholder={`Add task`}
        value={createTaskTitle.value.id === taskContainerId ? createTaskTitle.value.title : ""}
        onChange={(e) => {
          createTaskTitle.value = {
            title: e.target.value,
            id: e.target.value === "" ? -1 : taskContainerId,
          };
          setSelectedTask(-1);
        }}
      ></input>
      <div
        className={`${active ? "h-[12rem] " : "h-0"} relative transition-all`}
      >
        <div
          className={`${active ? "" : "pointer-events-none opacity-0"}
           absolute w-full transition-all`}
        >
          <div className="flex w-full flex-col gap-2 py-2 text-sm">
            <div className="flex flex-col gap-2 rounded-md bg-gray-100 p-2">
              <div className="flex items-center justify-between px-1">
                <label htmlFor="start" className="font-semibold">
                  Время начала
                </label>
                <input
                  ref={beginDateRef}
                  id="start"
                  className="rounded-md p-1 px-2"
                  type="datetime-local"
                  defaultValue={nowString}
                  onChange={(e) => hanleBeginDateChange(e)}
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <label htmlFor="end" className="font-semibold">
                  Время окончания
                </label>
                <input
                  ref={endDateRef}
                  id="end"
                  className="rounded-md p-1 px-2"
                  type="datetime-local"
                  defaultValue={inOneHourString}
                  min={beginDateInput}
                  onChange={(e) => handleEndDateChange(e)}
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <label htmlFor="list" className="font-semibold">
                  Список
                </label>
                <select
                  name="list"
                  id="list"
                  className="rounded-md px-2 py-1"
                  defaultValue={defaultListId}
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
            </div>
            <button
              className="w-full rounded-md bg-blue-500 py-1 text-lg text-white"
              onClick={() => handleCreateTask()}
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
