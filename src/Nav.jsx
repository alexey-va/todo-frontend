import search from "./assets/icons8-search.svg";
import React, { useState } from "react";

export default function Nav(){

  const [burger, setBurger] = useState(false)

  return(
    <>

      <div className="flex justify-between font-semibold text-sm px-3 relative">
        <div className="">Menu</div>
        <div className="absolute max-w-[1rem] w-[8%]  h-full right-4 cursor-pointer"
             onClick={() => setBurger(o => !o)}>
                                <span
                                  className={`${burger ? "transform rotate-45 translate-y-1" : ""} transition-all ease-out absolute w-full h-[1.5px] top-1 rounded-lg bg-gray-600`}></span>
          <span
            className={`${burger ? "hidden" : ""} absolute w-full h-[1.5px] transition-all ease-out top-2 rounded-lg bg-gray-600`}></span>
          <span
            className={`${burger ? "transform -rotate-45 -translate-y-1" : ""} transition-all ease-out absolute w-full h-[1.5px] top-3 rounded-lg bg-gray-600`}></span>
        </div>
      </div>

      <div className="px-3 py-1 pb-0 flex">
        <div className="relative w-full">
          <img
            className="absolute w-3.5 opacity-50 top-3 left-2 "
            src={search} alt="LUL"/>
          <input className="bg-transparent rounded-lg border my-2 opacity-50
                            text-left indent-7 text-xs py-0.5 font-semibold w-full border-gray-500"
                 type="text" placeholder="Search"/>
        </div>
      </div>

    </>
  )
}