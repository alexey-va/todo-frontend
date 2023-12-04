import React, { useRef, useState } from "react";
import search from "./assets/icons8-search.svg";
import Tasks from "./Tasks.jsx";
import Lists from "./Lists.jsx";
import Tags from "./Tags.jsx";
import { Wall } from "./Wall.jsx";
import Nav from "./Nav.jsx";

export default function App() {

  const allTags = useRef(
    [
    {
      name:
        "Tag 1",
      color:
        "#D1EAED",
      id: 0
    },
    {
      name:
        "Tag 2",
      color:
        "#FFDADA",
      id: 1
    },
    {
      name:
        "Tag 3",
      color:
        "#dd77ed",
      id: 2
    }
  ]);

  const [searchTags, setSearchTags] = useState([]);


  const [sec, setSec] = useState(-1);
  const [tags, setTags] = useState([
    { name: "Tag 1", color: "#D1EAED", id: 0 },
    { name: "Tag 2", color: "#FFDADA", id: 1 },
    { name: "Tag 3", color: "#dd77ed", id: 2 }
  ]);


  return <>
    <div className="bg-[#BCCAB8] w-full h-screen flex items-center justify-center">

      <div className="bg-white max-w-5xl max-h-[40rem] min-w-[30rem] w-[90%]  h-[90%] rounded-2xl shadow-2xl flex flex-row p-4">

        <div className="flex flex-col overflow-y-scroll no-scrollbar bg-[#F4F4F4] rounded-xl py-2  min-w-[11rem]">
          <Nav />
          <Tasks selected={sec} setSelected={setSec} />
          <hr className="my-3 mx-3" />
          <Lists selected={sec} setSelected={setSec} />
          <hr className="my-3 mx-3" />
          <div className="mb-2 mt-3 px-3 text-[0.55rem] font-bold uppercase opacity-60">
            Tags
          </div>
          <div className="w-full self-stretch">
            <Tags add="px-2" parentTagsData={searchTags} setParentTags={setSearchTags} allTags={allTags.current} />
          </div>

        </div>

        <div className="flex-grow">
          <Wall allTags={allTags} searchTags={searchTags}/>
        </div>

      </div>


    </div>
  </>;
}