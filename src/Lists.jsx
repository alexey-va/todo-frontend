import React, { useState } from "react";

export default function Lists({ selected, setSelected, lists, setLists }) {
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
