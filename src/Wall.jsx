import { useEffect, useRef, useState } from "react";
import StickerPopup from "./StickerPopup.jsx";
import Overlay from "./Overlay.jsx";
import TagList from "./TagList.jsx";

export function Wall({ allTags, searchTags }) {

  const [pop, setPop] = useState(-2);

  const [notes, setNotes] = useState({
    0: {
      theme: "Social Media",
      text: "Lorem Ipsum is simply ",
      color: "#FFDBDB",
      tags: [0, 1],
      id: 0
    },
    1: {
      theme: "Content", text: "would nee time to lorem ipsum", color: "#D1EAED", tags: [0, 1], id: 1
    },
    2: {
      theme: "Email A/B Tests", text: "would nee time to lorem ipsum", color: "#FFDADA", tags: [0, 1], id: 2
    },
    3: {
      theme: "Banner Ads", text: "would nee time to lorem ipsum", color: "#FFD4A9", tags: [0], id: 3
    }
  });

  const selectedTags = useRef([]);

  const setSelectedTags = (tags) => {
    selectedTags.current = tags;
  };

  const changeNote = (id, newTitle, newText, newTags, color) => {
    console.log("change note")
    setNotes(prevState => {
      console.log("set state")
      if(id === -1){
        let array = Object.keys(prevState).map(str => parseInt(str));
        prevState[Math.max(...array)+1]=
          {
            theme: newTitle,
            color: color,
            text: newText,
            tags: newTags,
            id: id
          };
      } else {
        prevState[id] =
          {
            theme: newTitle,
            color: color,
            text: newText,
            tags: newTags,
            id: id
          };
      }
      return prevState;
    });
    console.log("set done")
    setPop(-2);
  };


  const clear = () => {
    setPop(-2);
  };

  return (<>
    <div className="h-full px-4 relative flex flex-col">
      <StickerPopup clear={clear} selectedTags={selectedTags} setSelectedTags={setSelectedTags} index={pop}
                    notes={notes} allTags={allTags} changeNote={changeNote} />
      <div className="text-[1.75rem] font-semibold flex items-center p-2">
        <div className="">Sticky Wall</div>
      </div>
      <div className="no-scrollbar h-full overflow-y-scroll rounded-lg border">
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3 h-max gap-3 p-2">
          {Object.keys(notes).map((key) => {
            let value = notes[key];

            if(searchTags.length > 0 && !searchTags.every(r => value.tags.includes(r))) return "";

            return (
              <div
                className={`cursor-pointer no-scrollbar max-sm:aspect-auto aspect-square
                  overflow-y-scroll rounded-lg p-2 drop-shadow-md flex flex-col
                  `}
                style={{ backgroundColor: value.color }}
                key={`${key}`}
                onClick={() => {
                  setSelectedTags(notes[key].tags);
                  setPop(Number(key));
                }}
              >
                <div className="mb-1 text-[0.7rem] font-bold">
                  {value.theme}
                </div>

                <div className="text-[0.6rem] max-sm:mb-2">{value.text}</div>

                <TagList add={`mt-auto`} allTags={allTags.current} parentTagsData={value.tags}/>
              </div>
            );
          })}

          <div
            className="cursor-pointer flex aspect-square min-w-[6rem] items-center
               justify-center rounded-lg bg-gray-200 p-2 pb-5 text-[3rem] drop-shadow-md"
            onClick={() => {
              setPop(-1);
              setSelectedTags([]);
            }}>
            <div className="">+</div>
          </div>

        </div>
      </div>
    </div>
  </>);
}
