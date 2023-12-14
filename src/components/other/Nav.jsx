import search from "../../assets/icons8-search.svg";

export default function Nav(){



  return(
    <>

      <div className="flex justify-between font-semibold text-[1rem] px-3 relative">
        <div className="">Menu</div>

      </div>

      <div className="px-3 py-0.5 pb-0 flex">
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