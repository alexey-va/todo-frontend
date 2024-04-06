import Navigation from "./Navigation.jsx";
import TasksBar from "./TasksBar.jsx";
import ListsBar from "./ListsBar.jsx";
import Tags from "./Tags.jsx";
import { useState } from "react";
import { authed, searchTags } from "../../Signals.jsx";

export default function Panel() {
  const [burger, setBurger] = useState(false);

  const setSearchTags = (tags) => {
    let dict = searchTags.value;
    dict.tags = tags;
    searchTags.value = dict;
  };

  return (
    <>
      {/* Burger button */}
      <div
        className={`absolute right-6 top-5 z-[1000] h-[2rem] w-[1.4rem] cursor-pointer opacity-60 transition-all
         transition-all hover:opacity-100 max-sm:fixed sm:left-4  sm:top-5`}
        onClick={() => setBurger((o) => !o)}
      >
        <span
          className={`${
            burger ? "bg-gray-400" : ""
          } absolute top-1 h-[2px] w-full rounded-lg bg-gray-800 ease-in-out`}
        ></span>
        <span
          className={`${
            burger ? "bg-gray-400" : ""
          } absolute top-2.5 h-[2px] w-full rounded-lg bg-gray-800  ease-in-out`}
        ></span>
        <span
          className={`${
            burger ? "bg-gray-400" : ""
          } absolute top-4 h-[2px] w-full rounded-lg bg-gray-800  ease-in-out`}
        ></span>
      </div>
      {/* Burger button */}

      <div
        className={`relative flex h-full max-w-[40%] origin-left  overflow-clip rounded-l-2xl transition-all max-sm:absolute max-sm:z-[100]
      ${burger ? "pointer-events-none sm:w-[2rem]" : "sm:w-[15rem]"}`}
      >
        <div
          className={`no-scrollbar absolute flex h-full overflow-x-clip transition-all  ${
            !burger ? "bg-[#F4F4F4] max-sm:shadow-2xl" : "-translate-x-[5rem]"
          } z-[5] flex-col overflow-x-visible overflow-y-scroll py-3 max-sm:fixed max-sm:z-[1000]  max-sm:h-full
           max-sm:w-fit max-sm:rounded-none`}
        >
          <div
            className={`${
              burger ? "max-sm:hidden" : ""
            } max-sm:fixed max-sm:h-full max-sm:w-full`}
            onMouseDown={() => setBurger((o) => !o)}
          ></div>

          <div
            className={`${
              burger
                ? "pointer-events-none -z-[1] origin-left opacity-0 "
                : "z-[5]"
            } w-full overflow-x-visible`}
          >
            <Navigation burger={burger} />
            <TasksBar />
            <hr className="mx-2 my-2" />
            <ListsBar />
            <hr className="mx-2 my-2 " />
            <div className="mb-2 mt-3 px-3 text-[0.55rem] font-bold uppercase opacity-60">
              Tags
            </div>
            <div className="w-full self-stretch overflow-x-visible">
              <Tags
                add="px-2"
                parentTagsSignal={searchTags}
                onChange={() => {}}
                setParentTags={setSearchTags}
              />
            </div>
          </div>
          <div
            className={`mt-auto px-2 ${
              burger ? "invisible" : ""
            } flex flex-col gap-2`}
          >
            <a href="https://github.com/alexey-va/todo-back">
              <div
                className={`flex items-center justify-center rounded-md bg-gray-500 py-1 text-white opacity-90 transition-all hover:bg-gray-600`}
              >
                Backend Repo
              </div>
            </a>
            <a href="https://github.com/alexey-va/todo-frontend">

              <div
                className={`flex items-center justify-center rounded-md bg-gray-500 py-1 text-white opacity-90 transition-all hover:bg-gray-600`}
              >Frontend Repo</div>
            </a>
            <button
              className="mt-auto flex w-full items-center justify-center rounded-md
            bg-red-500 py-1 text-white opacity-90 transition-all hover:bg-red-600"
              onClick={() => (authed.value = false)}
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
