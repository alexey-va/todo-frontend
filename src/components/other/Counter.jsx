import { tasksNew } from "../../Signals.jsx";

export default function Counter({ count, width, fontSize }) {
  return (
    <>
      <div
        className={`${count ? "" : "hidden"} flex aspect-square translate-y-[0.15rem]  items-center
          justify-center  overflow-hidden rounded-md border`}
        style={{ width: width, fontSize: fontSize }}
      >
        <div className="text-[1.0rem] opacity-70">
          {count > 0 ? count : ""}
        </div>
      </div>
    </>
  );
}
