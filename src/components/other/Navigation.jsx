import search from "../../assets/icons8-search.svg";

export default function Navigation() {
  return (
    <>
      <div className="relative flex justify-between px-3 text-[0.9rem] font-semibold">
        <div className="">Menu</div>
      </div>

      <div className="flex px-3 py-0.5 pb-0 text-[0.6rem]">
        <div className="relative w-full">
          <img
            className="absolute left-[5.5%] top-[33%] w-3.5 opacity-50"
            src={search}
            alt="LUL"
          />
          <input
            className="my-2 h-[1.45rem] w-full rounded-lg border border-gray-500 bg-transparent
                            py-2 text-left indent-7 font-semibold opacity-50 outline-[1px]"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </>
  );
}
