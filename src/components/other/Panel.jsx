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
      <div
        className={`no-scrollbar relative  flex  ${
          !burger
            ? "w-[14rem] bg-[#F4F4F4] max-sm:shadow-2xl"
            : "w-[2rem] max-sm:w-[0rem]"
        } z-[5] flex-col overflow-x-visible overflow-y-scroll rounded-xl py-3 max-sm:fixed max-sm:z-[1000]  max-sm:h-full max-sm:w-fit max-sm:rounded-none`}
      >
        <div
          className={
            `${burger ? "max-sm:hidden" : ""}  h-full w-full max-sm:fixed`
          }
          onMouseDown={() => {
            console.log("down")
            setBurger((o) => !o);
          }}
        ></div>
        <div
          className={`absolute ${
            burger ? "right-2 max-sm:right-6" : "right-4"
          } top-4 z-[6] h-[1rem] w-[1rem] cursor-pointer  max-sm:fixed`}
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
            } absolute top-2 h-[2px] w-full rounded-lg bg-gray-800  ease-in-out`}
          ></span>
          <span
            className={`${
              burger ? "bg-gray-400" : ""
            } absolute top-3 h-[2px] w-full rounded-lg bg-gray-800  ease-in-out`}
          ></span>
        </div>
        <div
          className={`${
            burger
              ? "pointer-events-none -z-[1] origin-left opacity-0 "
              : "z-[5]"
          } w-full overflow-x-visible`}
        >
          <Navigation />
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
        <div className={`mt-auto px-2 ${burger ? "invisible" : ""}`}>
          <button
            className="mt-auto flex w-full items-center justify-center rounded-md
            bg-red-400 py-1 text-white"
            onClick={() => (authed.value = false)}
          >
            Выйти
          </button>
        </div>
      </div>
    </>
  );
}
