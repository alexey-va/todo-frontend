import Nav from "./Nav.jsx";
import Tasks from "./Tasks.jsx";
import Lists from "./Lists.jsx";
import Tags from "./Tags.jsx";
import { useState } from "react";
import { searchTags} from "../../Signals.jsx";

export default function Panel() {
  const [burger, setBurger] = useState(false);

  const setSearchTags = (tags) => {
    let dict = searchTags.value
    dict.tags = tags
    searchTags.value = dict
  }

  return (
    <>
      <div
        className={`no-scrollbar relative flex transition-all ${
          !burger ? "w-[14rem] bg-[#F4F4F4]" : "w-[2rem]"
        } z-[5] flex-col overflow-x-visible overflow-y-scroll rounded-xl py-3`}
      >
        <div
          className={`absolute ${
            burger ? "right-2" : "right-4"
          } top-4 z-[6] h-[1rem] w-[1rem] cursor-pointer transition-all`}
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
        <div
          className={`${
            burger
              ? "pointer-events-none -z-[1] origin-left opacity-0 transition-all"
              : "z-[5]"
          } w-full overflow-x-visible`}
        >
          <Nav />
          <Tasks />
          <hr className="mx-2 my-2" />
          <Lists />
          <hr className="mx-2 my-2 transition-all" />
          <div className="mb-2 mt-3 px-3 text-[0.55rem] font-bold uppercase opacity-60">
            Tags
          </div>
          <div className="w-full self-stretch overflow-x-visible">
            <Tags add="px-2" parentTagsSignal={searchTags} onChange={() => {}} setParentTags={setSearchTags}/>
          </div>
        </div>
      </div>
    </>
  );
}
