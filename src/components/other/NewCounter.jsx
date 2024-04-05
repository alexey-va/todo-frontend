export default function NewCounter({ count, width, fontSize }) {
  console.log(count);
  if (count === undefined || count === null || count === 0) return "";
  return (
    <>
      <div
        className={`${
          count ? "" : "hidden"
        } flex aspect-square translate-y-[0.15rem]  items-center
          justify-center  overflow-hidden rounded-md border`}
        style={{ width: width, fontSize: fontSize }}
      >
        <div className="text-[1.0rem] opacity-70">{count > 0 ? count : ""}</div>
      </div>
    </>
  );
}
