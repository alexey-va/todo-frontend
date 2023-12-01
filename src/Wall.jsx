import { useEffect, useRef } from "react";

export function Wall({ notes }) {
  return (
    <>
      <div className="h-full px-4">
        <div className="h-[7.5%] text-[1.75rem] font-semibold">Sticky Wall</div>
        <div className="no-scrollbar h-[92.5%] overflow-y-scroll rounded-lg border">
          <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3 h-max gap-2 p-2">
            {notes.map((value, index) => {
              return (
                <>
                  <div
                    className="no-scrollbar max-sm:aspect-auto aspect-square min-w-[6rem] flex-[1_1_30%] overflow-y-scroll rounded-lg p-2 drop-shadow-md"
                    style={{ backgroundColor: value.color }}
                  >
                    <div className="mb-1 text-[0.7rem] font-bold">
                      {value.theme}
                    </div>

                    <div className="text-[0.6rem]">{value.text}</div>
                  </div>
                </>
              );
            })}

            <div className="flex aspect-square min-w-[6rem] flex-[1_1_30%] items-center justify-center rounded-lg bg-gray-200 p-2 pb-5 text-[3rem] drop-shadow-md">
              <div className="">+</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
