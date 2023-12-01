import arrow from "./assets/double-arrow-right-svgrepo-com.svg";
import todo from "./assets/todo-list-svgrepo-com.svg";
import cal from "./assets/calendar-alt-svgrepo-com.svg";
import sticker from "./assets/sticker-square-svgrepo-com.svg";
import React, {useState} from "react";

export default function Tasks({selected, setSelected}) {

    return (<>
            <div className="px-3 text-[0.55rem] font-bold opacity-60 mt-3 mb-1 uppercase">Tasks</div>
            <div className="px-3 flex flex-col gap-0.5 text-[0.65rem]">
                <div className={`${selected === 0 ? "bg-gray-200" : ""} flex cursor-pointer flex-row gap-1 font-medium items-center group
                              rounded-md p-0.5 hover:bg-gray-200 transition-all ease-out`}
                     onClick={() => setSelected(0)}>
                    <img src={arrow} alt="" className="w-5 opacity-40"/>
                    Upcoming
                    <div className={`${selected === 0 ? "bg-gray-300" : ""} ml-auto w-[1.5rem] group-hover:bg-gray-300 text-center bg-gray-200 px-1.5
                        rounded-sm text-[0.55rem] font-bold transition-all ease-out`}>12</div>
                </div>

                <div className={`${selected === 1 ? "bg-gray-200" : ""} cursor-pointer flex flex-row gap-1 font-medium items-center
                    rounded-md p-0.5 hover:bg-gray-200 transition-all ease-out group`}
                     onClick={() => setSelected(1)}>
                    <img src={todo} alt="" className="w-5 opacity-40 transform scale-95"/>
                    Today
                    <div className={`${selected === 1 ? "bg-gray-300" : ""} ml-auto w-[1.5rem] group-hover:bg-gray-300 text-center bg-gray-200 px-1.5 rounded-sm
                        text-[0.55rem] font-bold transition-all ease-out`}>5</div>
                </div>

                <div className={`${selected === 2 ? "bg-gray-200" : ""} cursor-pointer flex flex-row gap-1 font-medium items-center
                    rounded-md p-0.5 hover:bg-gray-200 transition-all ease-out group`}
                     onClick={() => setSelected(2)}>
                    <img src={cal} alt="" className="w-5 opacity-40 transform scale-[0.85]"/>
                    Calendar
                    <div className={`${selected === 2 ? "bg-gray-300" : ""} hidden ml-auto group-hover:bg-gray-300 w-[1.5rem] text-center bg-gray-200 px-1.5 rounded-sm
                        text-[0.55rem] font-bold transition-all ease-out`}>12</div>
                </div>

                <div className={`${selected === 3 ? "bg-gray-200" : ""} cursor-pointer flex flex-row gap-1 font-medium items-center  rounded-md p-0.5
                    hover:bg-gray-200 transition-all ease-out group`}
                     onClick={() => setSelected(3)}>
                    <img src={sticker} alt="" className="w-5 opacity-40 transform scale-[0.8]"/>
                    Sticky Wall
                    <div className={`${selected === 3 ? "bg-gray-300" : ""} hidden ml-auto group-hover:bg-gray-300 w-[1.5rem] text-center bg-gray-200 px-1.5 rounded-sm
                        text-[0.55rem] font-bold transition-all ease-out`}>12</div>
                </div>


            </div>
        </>)
}