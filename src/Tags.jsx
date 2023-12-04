import { useEffect, useState } from "react";

export default function Tags({ parentTagsData, setParentTags, allTags, switchTag, add }) {

  let len = parentTagsData === null ? 0 : parentTagsData.length
  return (
    <>
      <div className={`${add} text-[0.6rem]`}>
      <div
        className={`font-bold m-0.5 inline-block rounded-[5px] bg-gray-200 px-3
          py-1 text-gray-600 group `}
      >
        <div className="relative">
          <div className="cursor-pointer group-hover:opacity-80 group-hover:w-2.5 w-0 opacity-0
             scale-150 absolute -left-1 -top-[10%]">+
          </div>
          <div className="cursor-pointer group-hover:pl-2 transition-all">Add Tag</div>
          <div className={`z-10 absolute bg-gray-600
             ${len !== allTags.length ? "group-hover:scale-100" : ""} scale-0
              transition-all duration-300 origin-top-left`}>
            <div className="fixed flex bg-white group-hover:w-fit group-hover:h-fit
                w-0 h-0 transition-all ease-out duration-500 rounded-xl group-hover:p-2 gap-0">
              {allTags.map((value) => {
                //if (parentTagsData !== undefined && parentTagsData.includes(value.id)) return "";
                return (
                  <div
                    key={value.id}
                    className={`${parentTagsData !== undefined && parentTagsData.includes(value.id) ? "" :
                      "m-0.5 group-hover:inline-block w-fit scale-100 pl-2.5 pr-1.5"}
                    cursor-pointer scale-0 w-0 self-start rounded-[5px] bg-green-200 
                      py-1 text-gray-600 hover:saturate-200 group whitespace-nowrap transition-all
                      `}
                    style={{ backgroundColor: value.color }}
                    onClick={() => {
                      let arr = [...parentTagsData]
                      arr.push(value.id)
                      setParentTags(arr);
                    }}
                  >
                    <div className="flex gap-2">
                      <div>{value.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className={`${add} text-[0.6rem] font-bold w-full min-h-[2rem]`}>
        {allTags.map((value) => {

          if (parentTagsData !== undefined && !parentTagsData.includes(value.id)) return "";
          return (
            <div
              key={value.id}
              className="m-0.5 inline-block cursor-pointer self-start rounded-[5px] bg-green-200 pl-2.5 pr-1.5
              py-1 text-gray-600 hover:saturate-200 group"
              style={{ backgroundColor: value.color }}
              onClick={() => {
                setParentTags(parentTagsData.filter(el => el !== value.id));
              }}
            >
              <div className="flex gap-2 ">
                <div>{value.name}</div>
              </div>
            </div>
          );
        })}

      </div>
    </>
  );
}
