import { fromTimestamp, hexToRgb, sameDay, toPix } from "../../myutils/Utils.jsx";
import { useEffect, useRef } from "react";
import { allTasks, calendarScroll, lists } from "../../Signals.jsx";
import CalendarScroller from "../other/CalendarScroller.jsx";

export default function Calendar() {
  const scrollable = useRef();
  const parent = useRef();

  let now = new Date();
  let offset = 4 * (now.getHours() + now.getMinutes() / 60.0);

  const checkScroll = () => {
    let distance = scrollable.current.scrollTop - toPix(offset);
    let obj = { ...calendarScroll.value };
    let maxScrollTop =
      scrollable.current.scrollHeight - scrollable.current.clientHeight;

    if (
      Math.abs(distance) < parent.current.getBoundingClientRect().height / 3 ||
      Math.abs(scrollable.current.scrollTop - maxScrollTop) < 5
    ) {
      if (calendarScroll.value.pointer === 0) return;
      obj.pointer = 0;
      calendarScroll.value = obj;
    } else if (distance > 0) {
      if (calendarScroll.value.pointer === 1) return;
      obj.pointer = 1;
      calendarScroll.value = obj;
    } else {
      if (calendarScroll.value.pointer === -1) return;
      if (distance > -scrollable.current.getBoundingClientRect().height) return;
      obj.pointer = -1;
      calendarScroll.value = obj;
    }
    ///console.log(calendarScroll.value.pointer);
  };

  const move = (smooth) => {
    scrollable.current.scrollTo({
      top: toPix(offset) - 40,
      behavior: smooth ? "smooth" : "instant",
    });
  };

  const getShift = () => {
    return scrollable.current.getBoundingClientRect().height * 0.9;
  };

  useEffect(() => {
    move(false);
    calendarScroll.value.translate = getShift();
  }, []);

  const getTaskStack = () => {
    let stack = [];
    return allTasks.value.map((value) => {
      let d1 = fromTimestamp(value.startDate);
      let d2 = fromTimestamp(value.endDate);
      let duration = d2 - d1;


      let isListExists = lists.value.find((i) => i.id === value.list);
      if (!isListExists) return "";
      //console.log(d1.toISOString(), d2.toISOString(), duration/1000/60/60);

      //console.log(value.startDate, value.endDate);
      //console.log(!sameDay(d1, new Date()), d1, new Date());
      //console.log((!sameDay(d2, new Date()) ), d2, new Date())
      //if (!sameDay(d1, new Date())) return "";
      //if (!sameDay(d2, new Date())) return "";
      let margin = !sameDay(d1, new Date()) ? 0
        : (d1.getHours() + d1.getMinutes() / 60.0) * 4;
      let height = sameDay(new Date(), d2)
        ? duration / 1000 / 60 / 60 * 4
        : (24 - d1.getHours() - d1.getMinutes() / 60.0) * 4;

      let color = "#69f369";
      if (value.list !== undefined) {
        let list = lists.value.find((i) => i.id === value.list);
        //console.log(value.list);
        if (list !== null && list !== undefined) color = list.color;
        else color = "#69f369";
      }
      let offset = 0;
      let rightOffset = 0;
      stack.forEach((val) => {
        if (margin >= val[0] && margin <= val[1]) {
          if (margin - val[0] < 1.5) {
            margin += 1.2;
            height -= 1.2;
            rightOffset++;
          }
          offset++;
          //if (margin + height <= val[1])
        }
      });


      //console.log(margin, margin+height);
      let bottom = Math.min(margin + height, 25 * 4);
      let onTheBottom = bottom === 25 * 4;

      stack.push([margin, bottom]);
      //console.log(diff+" "+value.id)
      return (
        <div
          key={value.id}
          className={`absolute z-10 flex h-[3rem] flex-row overflow-hidden rounded-md bg-green-100
            mix-blend-multiply ${onTheBottom ? "rounded-b-none" : ""}`}
          style={{
            marginTop: margin + `rem`,
            height: (bottom-margin) + "rem",
            marginLeft: offset / 2 + "rem",
            marginRight: rightOffset / 4 + "rem",
            width: `calc(100% - ${offset / 2 + rightOffset / 4}rem)`,
            backgroundColor: "rgba(" + hexToRgb(color) + ",0.3)",
          }}
        >
          <div
            className="h-full w-1 brightness-[90%] saturate-200"
            style={{ backgroundColor: "rgba(" + hexToRgb(color) + ",1.0)" }}
          ></div>
          <div className="p-1 text-[0.7rem] font-normal">
            <div
              className="brightness-[85%] hue-rotate-15 saturate-[2]"
              style={{ color: "rgba(" + hexToRgb(color) + ",1.0)" }}
            >
              {value.title}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="relative flex h-full flex-col pl-4 max-sm:px-2" ref={parent}>
        <div className="flex h-[10%] flex-col font-semibold max-sm:h-[7.5%]  max-xs:h-[7.5%]">
          <div className="flex flex-row items-center justify-between">
            <div className="text-[1.75rem] max-sm:text-[1.0rem] max-xs:text-[0.8rem] ">
              {new Date().getDate() +
                " " +
                new Date().toLocaleDateString("en", { month: "long" }) +
                " " +
                new Date().getFullYear()}
            </div>

{/*            <div
              className="cursor-pointer scroll-smooth rounded-md border-[1px] px-2 py-1 text-[0.7rem]"
              onClick={() => move(true)}
            >
              scroll
            </div>*/}
          </div>

          <div className="pl-[0rem] text-sm text-gray-700/40">
            {new Date().toLocaleDateString("en", { weekday: "long" }) +
              " " +
              new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
          </div>
        </div>

        <div
          className="no-scrollbar relative grid h-[90%] w-full grid-rows-[24] flex-row overflow-x-visible
         overflow-y-scroll rounded-md border pt-[0.2rem]
          transition-all max-sm:h-[92.5%] max-xs:h-[92.5%]"
          ref={scrollable}
          onScroll={() => checkScroll()}
        >
          <CalendarScroller action={move} />
          <div
            className="absolute left-[3.6rem] z-[1] h-1 w-1 rounded-full bg-black"
            style={{ top: offset + 0.2 - 0.1 + "rem" }}
          ></div>
          <div
            className="absolute left-[3.7rem] z-[1] h-[0.5px] w-[calc(100%-3.7rem)] bg-black"
            style={{ top: offset + 0.2 + "rem" }}
          ></div>
          {[...Array(25).keys()].map((value) => {
            return (
              <div key={value} className=" relative flex flex-row">
                {value === 0 ? "" : <hr className="absolute w-full" />}
                <div className="flex h-[4rem] w-[5rem] min-w-[5rem] max-w-[5rem] grow-0">
                  <div className="w-1/2 text-right text-[0.65rem]">
                    <div className="mt-1">
                      {value > 12 ? value % 12 : value}:00
                    </div>
                    <div className="-mt-[2px]">{value > 12 ? "PM" : "AM"}</div>
                  </div>
                </div>
                <div className="relative mr-3 h-[4rem] grow-0 basis-5/6">
                  {value === 0 ? getTaskStack() : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
