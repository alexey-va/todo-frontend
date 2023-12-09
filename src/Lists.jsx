import React, { useRef, useState } from "react";

export default function Lists({ selected, setSelected }) {
  const [lists, setLists] = useState([
    { name: "Personal", color: "#FF6B6B", new: 12, id: 0 },
    { name: "Work", color: "#66D9E8", new: 5, id: 1 },
    { name: "List 1", color: "#FFD43B", new: 0, id: 2 },
  ]);

  const [create, setCreate] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const newListName = useRef();


  const colorMap = useRef([
    "#a1fbd6",
    "#266fab",
    "#faafff",
    "#fbe2a1",
    "#5267d3",
    "#cc82b6",
    "#a1fbd6",
  ]);

  const addList = () => {
    let maxId = -1;
    if(newListName.current.value === "") return;
    lists.forEach((val) => {
      if (val.id > maxId) maxId = val.id;
    })
    let list = {
      name: newListName.current.value,
      color: colorMap.current[colorIndex],
      new: 0,
      id: maxId+1
    }
    setLists((prevState) => {
      let arr = [...prevState]
      arr.push(list)
      return arr;
    })
  }

  return (
    <>
      <div className="mb-1 mt-3 px-3 text-[0.55rem] font-bold uppercase opacity-60">
        Lists
      </div>
      <div className="flex flex-col gap-0.5 px-3 text-[0.65rem]">
        {lists.map((val) => {
          return (
            <div
              key={val.id}
              className={`${
                selected.group === "lists" && selected.id === val.id
                  ? "bg-gray-200"
                  : ""
              } group flex cursor-pointer flex-row items-center gap-1 rounded-md
                              p-[0.25rem] font-medium transition-all ease-out hover:bg-gray-200`}
              onClick={() => setSelected({ group: "lists", id: val.id })}
            >
              <div
                className={`mx-1 aspect-square w-3 rounded-[3px]`}
                style={{ backgroundColor: val.color }}
              ></div>
              {val.name}
              <div
                className={`${
                    selected.group === "lists" && selected.id === val.id ? "bg-gray-300" : ""
                } ml-auto w-[1.5rem] rounded-sm bg-gray-200 px-1.5 text-center
                        text-[0.55rem] font-bold transition-all ease-out group-hover:bg-gray-300`}
              >
                {val.new > 0 ? val.new : ""}
              </div>
            </div>
          );
        })}

        <div
          className={`group flex cursor-pointer flex-row items-center gap-1  rounded-md
                    p-[0.25rem] font-medium transition-all ease-out hover:bg-gray-200`}
          onClick={() => setCreate((prev) => !prev)}
        >
          <div className="relative mx-1 flex aspect-square w-3 text-center text-xl font-bold">
            <div className="absolute -left-[0.05rem] -top-[0.65rem] opacity-50">
              +
            </div>
          </div>
          <div className="">Add New List</div>
        </div>
        <div className={`overflow-hidden flex ${create ? "h-[7rem]" : "h-0"} transition-all duration-500`}>
          <div
            className={`${
              create ? "" : "-translate-y-[6rem]"
            } my-2 h-fit flex origin-top flex-col rounded-md border p-2 transition-all duration-500`}
          >
            <div className="relative rounded-md border p-1">
              <div
                className="absolute left-[0.4rem] top-[0.4rem] aspect-square w-[0.75rem] rounded-[3.5px] border bg-red-500"
                style={{ backgroundColor: colorMap.current[colorIndex] }}
              ></div>
              <input
                type="text"
                placeholder="List Name"
                className={`w-full border-none bg-gray-100 pl-6 focus:outline-0`}
                ref={newListName}
              />
            </div>

            <div className="no-scrollbar ml-1 mt-3 flex flex-row justify-between overflow-x-hidden">
              {colorMap.current.map((value, index) => {
                return (
                  <>
                    <div
                      className={`${
                        index === colorIndex
                          ? "rounded-[4px] border-gray-300"
                          : "border-transparent"
                      } box-border
                   border p-0.5 transition-all duration-300 ease-out`}
                    >
                      <div
                        className="aspect-square w-[0.75rem] min-w-[0.75rem] rounded-[3.5px] border cursor-pointer"
                        style={{ backgroundColor: value }}
                        key={index + ""}
                        onClick={() => setColorIndex(index)}
                      ></div>
                    </div>
                  </>
                );
              })}
            </div>

            <div
              className="mt-2 flex cursor-pointer justify-center rounded-lg bg-blue-500 py-0.5 text-white
           transition-all duration-500 ease-out hover:bg-blue-700 "
              onClick={() => {
                addList();
              }}
            >
              Done
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
