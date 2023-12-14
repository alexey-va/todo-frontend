import { useEffect, useState } from "react";

export default function TagList({ parentTagsData, allTags, add }) {


  return (
    <>
      <div className={`${add} text-[0.6rem] font-bold w-full`}>
        {allTags.map((value) => {

          if (parentTagsData !== undefined && !parentTagsData.includes(value.id)) return "";
          return (
            <div
              key={value.id}
              className="m-0.5 inline-block cursor-pointer self-start rounded-[5px] bg-green-200 pl-2.5 pr-1.5
              py-1 text-black saturate-[300%] brightness-[85%]"
              style={{ backgroundColor: value.color }}
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
