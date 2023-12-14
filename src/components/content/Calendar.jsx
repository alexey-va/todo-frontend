import { toPix } from "../../myutils/Utils.jsx";
import { useEffect, useRef, useState } from "react";

export default function Calendar() {
  const scrollable = useRef();
  const parent = useRef();
  const [pointer, setPointer] = useState(0);

  let now = new Date();
  let offset = 4 * 11.5;
  //4*(now.getHours()+ now.getMinutes()/60.0)/2

  const checkScroll = () => {
    let distance = scrollable.current.scrollTop - toPix(offset);
    if (Math.abs(distance) < parent.current.getBoundingClientRect().height / 3)
      setPointer(0)
    else if (distance > 0) setPointer(1);
    else setPointer(-1);
  };

  const move = (smooth) => {
    scrollable.current.scrollTo({top: toPix(offset) - 40,behavior: (smooth ? "smooth" : "instant")});
  };

  useEffect(() => {
    move(false);
  }, []);

  return (
    <>
      <div className="relative flex h-full flex-col pl-4 " ref={parent}>
        <div className="flex h-[8%] flex-row items-center justify-between pb-2 font-semibold">
          <div className="text-[1.75rem] max-sm:text-[1.0rem] max-xs:text-[0.8rem] ">
            {new Date().getDate() +
              " " +
              new Date().toLocaleDateString("en", { month: "long" }) +
              " " +
              new Date().getFullYear()}
          </div>

          <div
            className="cursor-pointer scroll-smooth rounded-md border-[1px] px-2 py-1 text-[0.7rem]"
            onClick={() => move()}
          >
            Add Event
          </div>
        </div>
        <div className="pb-2 pl-[5rem] text-xs text-gray-700">
          {new Date().toLocaleDateString("en", { weekday: "long" })}
        </div>

        <div
          className="no-scrollbar relative grid h-[92%] w-full grid-rows-[24]
         flex-row overflow-x-visible overflow-y-scroll transition-all"
          ref={scrollable}
          onScroll={() => checkScroll()}
        >
          <div
            className={`${pointer !== 1 ? "scale-0" : "scale-100"} fixed z-10 translate-y-3
           flex aspect-square w-[2rem]  items-center transition-all cursor-pointer
            justify-center justify-self-center rounded-full bg-[#263B56] text-white opacity-100 shadow-2xl`}
            onClick={() => move(true)}
          >
            <div className="-translate-y-0.5 text-xl">🡱</div>
          </div>
          <div
            className={`${pointer !== -1 ? "scale-0" : "scale-100"} fixed z-10 bottom-[5rem]
           flex aspect-square w-[2rem]  items-center transition-all cursor-pointer
            justify-center justify-self-center rounded-full bg-[#263B56] text-white opacity-100 shadow-2xl`}
            onClick={() => move(true)}
          >
            <div className="translate-y-0.5 text-xl">🡳</div>
          </div>
          <div
            className="absolute left-[3.6rem] h-1 w-1 rounded-full bg-black"
            style={{ top: offset - 0.09 + "rem" }}
          ></div>
          <div
            className="absolute left-[3.7rem] h-[0.5px] w-full bg-black"
            style={{ top: offset + "rem" }}
          ></div>
          {[...Array(24).keys()].map((value) => {
            return (
              <div key={value} className=" flex flex-row">
                <div className="flex h-[4rem] w-[5rem] min-w-[5rem] max-w-[5rem] grow-0">
                  <div className="w-1/2 text-right text-[0.45rem]">
                    <hr className="" />
                    <div className="mt-1">
                      {value > 12 ? value % 12 : value}:00
                    </div>
                    <div className="-mt-[2px]">{value > 11 ? "PM" : "AM"}</div>
                  </div>
                </div>
                <div className="relative mr-3 h-[4rem] grow-0 basis-5/6">
                  <div
                    className="absolute h-[3rem] w-full rounded-md bg-green-500 mix-blend-multiply"
                    style={{ marginTop: "0rem" }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
