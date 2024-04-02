import { allTasks, authed, credentials, lists } from "../../Signals.jsx";
import { useState } from "react";
import { serializeDate } from "../../myutils/Utils.jsx";

export default function TaskEditor() {

  const now = new Date();
  now.setHours(now.getHours() + 3);
  // Format to match the datetime-local input requirements (YYYY-MM-DDTHH:mm)
  // toISOString() returns a time in UTC, so we create a new date object in the local timezone
  const nowString = now.toISOString().slice(0, 16);
  const inOneHourString = new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);

  const [title, setTitle] = useState("");

  const handleCreateTask = () => {
    const startInput = document.querySelector("#start").value;
    const endInput = document.querySelector("#end").value;

    let startDate = new Date(startInput);
    let endDate = new Date(endInput);

    startDate.setHours(startDate.getHours() + 3);
    endDate.setHours(endDate.getHours() + 3);

    const start = serializeDate(startDate);
    const end = serializeDate(endDate);
    console.log("Start: ", start, "End: ", end);

    const list = document.querySelector("#list").value;
    const upcoming = 0;

    fetch(`http://localhost:9090/api/v1/user/tasks?task_list=${list}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(credentials.value.login + ":" + credentials.value.password),
      },
      body: JSON.stringify({
        title: title,
        startDate: start,
        endDate: end,
        completed: false,
        upcoming: upcoming,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          authed.value=false;
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
    setTitle("")
  };

  return (
    <>
      <div className="absolute left-2 z-10 text-[1.4rem] font-semibold text-gray-500">
        +
      </div>
      <input
        className="relative w-full rounded-[4px] border px-2 py-1.5 pl-7 text-[1rem] outline-0
              max-sm:text-[0.85rem]"
        placeholder={`Add task`}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <div
        className={`relative ${
          title !== "" ? "" : "pointer-events-none h-0 opacity-0"
        } transition-all`}
      >
        <div className="flex flex-col gap-2 py-2 text-sm">
          <div className="flex flex-col gap-2 rounded-md bg-gray-100 p-2">
            <div className="flex items-center justify-between px-1">
              <label htmlFor="start" className="font-semibold">
                Время начала
              </label>
              <input
                id="start"
                className="rounded-md p-1 px-2"
                type="datetime-local"
                defaultValue={nowString}
              />
            </div>
            <div className="flex items-center justify-between px-1">
              <label htmlFor="end" className="font-semibold">
                Время окончания
              </label>
              <input
                id="end"
                className="rounded-md p-1 px-2"
                type="datetime-local"
                defaultValue={inOneHourString}
              />
            </div>
            <div className="flex items-center justify-between px-1">
              <label htmlFor="list" className="font-semibold">
                Список
              </label>
              <select name="list" id="list" className="rounded-md px-2 py-1">
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
    </>
  );
}
