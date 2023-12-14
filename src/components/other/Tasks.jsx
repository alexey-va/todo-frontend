import arrow from "../../assets/double-arrow-right-svgrepo-com.svg";
import todo from "../../assets/todo-list-svgrepo-com.svg";
import cal from "../../assets/calendar-alt-svgrepo-com.svg";
import sticker from "../../assets/sticker-square-svgrepo-com.svg";

import { tasksNew } from "../../Signals.jsx";
import { selectedSection } from "../../Signals.jsx";

export default function Tasks() {
  return (
    <>
      <div className="mb-1 mt-3 px-3 text-[0.5rem] font-bold uppercase opacity-60">
        Tasks
      </div>
      <div className="flex flex-col gap-0.5 px-3 text-[0.55rem]">
        <div
          className={`${
            selectedSection.value.group === "tasks" &&
            selectedSection.value.id === 0
              ? "bg-gray-200"
              : ""
          } group flex cursor-pointer flex-row items-center gap-1 rounded-md
                              p-[0.25rem] font-medium transition-all ease-out hover:bg-gray-200`}
          onClick={() => (selectedSection.value = { group: "tasks", id: 0 })}
        >
          <img src={arrow} alt="" className="w-4 opacity-40" />
          Upcoming
          <div
            className={`${
              selectedSection.value.group === "tasks" &&
              selectedSection.value.id === 0
                ? "bg-gray-300"
                : ""
            } ml-auto w-[1.0rem] rounded-sm bg-gray-200 px-1.5 text-center
                        text-[0.45rem] font-bold transition-all ease-out group-hover:bg-gray-300`}
          >
            {tasksNew.value.upcoming && tasksNew.value.upcoming > 0 ? tasksNew.value.upcoming : ""}
          </div>
        </div>

        <div
          className={`${
            selectedSection.value.group === "tasks" &&
            selectedSection.value.id === 1
              ? "bg-gray-200"
              : ""
          } group flex cursor-pointer flex-row items-center gap-1
                    rounded-md p-[0.25rem] font-medium transition-all ease-out hover:bg-gray-200`}
          onClick={() => (selectedSection.value = { group: "tasks", id: 1 })}
        >
          <img
            src={todo}
            alt=""
            className="w-4 scale-95 transform opacity-40"
          />
          Today
          <div
            className={`${
              selectedSection.value.group === "tasks" &&
              selectedSection.value.id === 1
                ? "bg-gray-300"
                : ""
            } ml-auto w-[1.0rem] rounded-sm bg-gray-200 px-1.5 text-center text-[0.45rem]
                        font-bold transition-all ease-out group-hover:bg-gray-300`}
          >
            {tasksNew.value.today && tasksNew.value.today > 0 ? tasksNew.value.today : ""}
          </div>
        </div>

        <div
          className={`${
            selectedSection.value.group === "tasks" &&
            selectedSection.value.id === 2
              ? "bg-gray-200"
              : ""
          } group flex cursor-pointer flex-row items-center gap-1
                    rounded-md p-[0.25rem] font-medium transition-all ease-out hover:bg-gray-200`}
          onClick={() => (selectedSection.value = { group: "tasks", id: 2 })}
        >
          <img
            src={cal}
            alt=""
            className="w-4 scale-[0.85] transform opacity-40"
          />
          Calendar
          <div
            className={`${
              selectedSection.value.group === "tasks" &&
              selectedSection.value.id === 2
                ? "bg-gray-300"
                : ""
            }  ml-auto w-[1.0rem] rounded-sm bg-gray-200 px-1.5 text-center text-[0.45rem]
                        font-bold transition-all ease-out group-hover:bg-gray-300`}
          >
            {tasksNew.value.calendar && tasksNew.value.calendar > 0 ? tasksNew.value.calendar : ""}
          </div>
        </div>

        <div
          className={`${
            selectedSection.value.group === "tasks" &&
            selectedSection.value.id === 3
              ? "bg-gray-200"
              : ""
          } group flex cursor-pointer flex-row items-center gap-1 rounded-md p-[0.25rem]
                    font-medium transition-all ease-out hover:bg-gray-200`}
          onClick={() => (selectedSection.value = { group: "tasks", id: 3 })}
        >
          <img
            src={sticker}
            alt=""
            className="w-4 scale-[0.8] transform opacity-40"
          />
          Sticky Wall
          <div
            className={`${
              selectedSection.value.group === "tasks" &&
              selectedSection.value.id === 3
                ? "bg-gray-300"
                : ""
            } ml-auto w-[1.0rem] rounded-sm bg-gray-200 px-1.5 text-center text-[0.45rem]
                        font-bold transition-all ease-out group-hover:bg-gray-300`}
          >

          </div>
        </div>
      </div>
    </>
  );
}
