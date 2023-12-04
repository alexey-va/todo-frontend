import React, { useState } from "react";

export default function Lists({ selected, setSelected }) {

  const [lists, setLists] = useState([
    {name: "Personal", color: "#FF6B6B", new: 12, id: 4},
    {name: "Work", color: "#66D9E8", new: 5, id: 5},
    {name: "List 1", color: "#FFD43B", new: 0, id: 6},
  ])

  return (
    <>
      <div className="mb-1 mt-3 px-3 text-[0.55rem] font-bold opacity-60 uppercase">Lists</div>
      <div className="flex flex-col gap-0.5 px-3 text-[0.65rem]">


        {lists.map((val) => {
          return (
            <div key={val.id}
              className={`${
                selected === val.id ? "bg-gray-200" : ""
              } group flex cursor-pointer flex-row items-center gap-1 rounded-md
                              p-[0.25rem] font-medium transition-all ease-out hover:bg-gray-200`}
              onClick={() => setSelected(val.id)}
            >
              <div
                className={`mx-1 aspect-square w-3 rounded-[3px]`}
                style={{backgroundColor: val.color }}
              ></div>
              {val.name}
              <div
                className={`${
                  selected === val.id ? "bg-gray-300" : ""
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

        >
          <div className="mx-1 aspect-square w-3 text-center text-xl font-bold flex relative">
            <div className="absolute -top-[0.65rem] -left-[0.05rem] opacity-50">+</div>
          </div>
          Add New List
          <div
            className={`ml-auto hidden w-[1.5rem] rounded-sm bg-gray-200 px-1.5 text-center text-[0.55rem]
                        font-bold transition-all ease-out group-hover:bg-gray-300`}
          >

          </div>
        </div>
      </div>
    </>
  );
}
