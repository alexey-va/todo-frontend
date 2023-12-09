import React, { useRef, useState } from "react";
import search from "./assets/icons8-search.svg";
import Tasks from "./Tasks.jsx";
import Lists from "./Lists.jsx";
import Tags from "./Tags.jsx";
import { Wall } from "./Wall.jsx";
import Nav from "./Nav.jsx";
import Panel from "./Panel.jsx";

export default function App() {
  const allTags = useRef([
    {
      name: "Tag 1",
      color: "#D1EAED",
      id: 0,
    },
    {
      name: "Tag 2",
      color: "#FFDADA",
      id: 1,
    },
    {
      name: "Tag 3",
      color: "#dd77ed",
      id: 2,
    },
  ]);

  const [searchTags, setSearchTags] = useState([]);
  const [selectedSection, setSelectedSection] = useState({
    group: "none",
    id: 0
  });
  const [tags, setTags] = useState([
    { name: "Tag 1", color: "#D1EAED", id: 0 },
    { name: "Tag 2", color: "#FFDADA", id: 1 },
    { name: "Tag 3", color: "#dd77ed", id: 2 },
  ]);

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#BCCAB8]">
        <div className="flex h-[90%] max-h-[40rem] w-[90%] min-w-[30rem]  max-w-5xl flex-row rounded-2xl bg-white p-4 shadow-2xl">
          <Panel
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            searchTags={searchTags}
            setSearchTags={setSearchTags}
            allTags={allTags.current}
          />

          <div className="flex-grow">
            <Wall allTags={allTags} searchTags={searchTags} />
          </div>
        </div>
      </div>
    </>
  );
}