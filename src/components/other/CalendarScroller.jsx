import { calendarScroll } from "../../Signals.jsx";

export default function CalendarScroller({ action }) {
  return (
    <>
      <div
        className={`${
          calendarScroll.value.pointer !== 1 ? "scale-0" : "scale-100"
        } fixed z-[50] flex
           aspect-square w-[2rem] translate-y-3  cursor-pointer items-center justify-center
            justify-self-center rounded-full bg-[#263B56] text-white opacity-100 shadow-2xl transition-all`}
        onClick={() => action(true)}
      >
        <div className="-translate-y-0.5 text-xl">🡱</div>
      </div>
      <div
        className={` fixed z-[50]
           flex aspect-square w-[2rem]  cursor-pointer items-center justify-center
            justify-self-center rounded-full bg-[#263B56] text-white opacity-100 shadow-2xl transition-all`}
        style={{
          transform: `translateY(${calendarScroll.value.translate}px) ${
            calendarScroll.value.pointer !== -1 ? "scale(0%)" : "scale(100%)"
          }`,
        }}
        onClick={() => action(true)}
      >
        <div className="translate-y-0.5 text-xl">🡳</div>
      </div>
    </>
  );
}