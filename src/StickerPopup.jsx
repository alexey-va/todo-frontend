import Tags from "./Tags.jsx";
import { useEffect, useRef, useState } from "react";

export default function StickerPopup({ selectedTags, setSelectedTags, allTags, notes, index, clear, changeNote }) {

  const [modifiedTags, setModifiedTags] = useState([]);
  const modified = useRef(false);

  const title = useRef();
  const text = useRef();

  const setCombinedTags = (tags) => {
    modified.current=true
    setModifiedTags(tags);
    setSelectedTags(tags);
  };

  const getUpdateData = () => {
    if(modified.current){
      console.log("getData")
      modified.current = false
      let color = "#FFDBDB"
      let id = -1
      if(index >= 0) {
        id = notes[index].id
        color = notes[index].color
      }
      changeNote(id, title.current.value, text.current.value, modifiedTags, color)

      let form = document.getElementById("myform");
      form.reset();
    }
  };

  return (
    <>
      <form id="myform">
        <div
          className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[5] ${index === -2 ? "scale-0" : ""}
      ${index >= -1 ? "z-10 opacity-100" : "opacity-0 -z-[1]"} backdrop-blur-[2px] fixed w-screen h-screen top-0 left-0 
       duration-150 ease-out transition-all cursor-pointer`}
          onMouseDown={(event) => {
            let form = document.getElementById("myform");
            form.reset();
            modified.current=false;
            clear();
          }}>
          <div className={`p-5 max-h-[40rem]  max-w-3xl w-1/2  bg-white rounded-xl z-[25] border-1 drop-shadow-2xl
        left-[10%] ${index === -2 ? "scale-0" : ""}  transition-all ease-out duration-100 cursor-default
        `}
               onMouseDown={(event) => event.stopPropagation()}>
            <div className=" flex flex-col gap-2 h-full">
            <textarea
              className={`bg-gray-200 h-[2.5rem] resize-none rounded-md drop-shadow p-2`}
              placeholder={`${index === -1 ? "Заголовок" : ""}`}
              defaultValue={`${index > -1 ? notes[index].theme : ""}`}
              ref={title}
              onChange={() => modified.current=true}
            />

              <textarea
                className={`bg-gray-200 min-h-[15vh] h-[70%] resize-none rounded-md drop-shadow p-2`}
                placeholder={`${index === -1 ? "Текст" : ""}`}
                defaultValue={`${index > -1 ? notes[index].text : ""}`}
                ref={text}
                onChange={() => modified.current=true}
              />

              <div className="">
                <Tags add={`text-[0.8rem]`} parentTagsData={selectedTags.current} setParentTags={setCombinedTags}
                      allTags={allTags.current} />
              </div>


              <button
                className={`bg-blue-500 rounded-xl text-white p-2 text-lg font-semibold hover:bg-blue-700
              transition-all ease-out duration-500`}
                type="button"
              onMouseUp={() => {
                console.log("mouse")
                getUpdateData()
              }}>
                {index === -1 ? "Создать" : "Изменить"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}