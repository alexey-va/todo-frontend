import Nav from "./Nav.jsx";
import Tasks from "./Tasks.jsx";
import Lists from "./Lists.jsx";
import Tags from "./Tags.jsx";
import React, { useState } from "react";

export default function Panel({
  selectedSection,
  setSelectedSection,
  searchTags,
  setSearchTags,
  allTags,
}) {
  const [burger, setBurger] = useState(false);

  return (
    <>
      <div
        className={`no-scrollbar relative flex transition-all ${
          !burger ? "w-[11rem] bg-[#F4F4F4]" : "w-[2rem]"
        } flex-col overflow-y-scroll overflow-x-visible rounded-xl  py-3`}
      >
        <div
          className={`absolute right-2 top-4 z-[6] h-[1rem] w-[1rem] cursor-pointer`}
          onClick={() => setBurger((o) => !o)}
        >
          <span
            className={`${
              burger ? "bg-gray-400" : ""
            } absolute top-1 h-[2px] w-full rounded-lg bg-gray-800 transition-all ease-in-out`}
          ></span>
          <span
            className={`${
              burger ? "bg-gray-400" : ""
            } absolute top-2 h-[2px] w-full rounded-lg bg-gray-800 transition-all ease-in-out`}
          ></span>
          <span
            className={`${
              burger ? "bg-gray-400" : ""
            } absolute top-3 h-[2px] w-full rounded-lg bg-gray-800 transition-all ease-in-out`}
          ></span>
        </div>
        <div className={`${burger ? "opacity-0 -z-[1] pointer-events-none origin-left transition-all" : "z-[5]"} w-[11rem] `}>
          <Nav />
          <Tasks selected={selectedSection} setSelected={setSelectedSection} />
          <hr className="mx-3 my-4" />
          <Lists selected={selectedSection} setSelected={setSelectedSection} />
          <hr className="mx-3 my-4 transition-all" />
          <div className="mb-2 mt-3 px-3 text-[0.55rem] font-bold uppercase opacity-60">
            Tags
          </div>
          <div className="w-full self-stretch">
            <Tags
              add="px-2"
              parentTagsData={searchTags}
              setParentTags={setSearchTags}
              allTags={allTags}
            />
          </div>
        </div>
      </div>
    </>
  );
}
