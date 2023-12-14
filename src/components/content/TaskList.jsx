import { allTasks } from "../../Signals.jsx";

export default function TaskList({ changeComplete, getAddList, predicate, title}){
  let seen = false;
  return (
    <div className="flex h-full w-full flex-col rounded-md border p-3 text-[0.8rem]">
      {title ? (
        <>
          <div className="mb-2 text-[1.0rem] font-bold">{title}</div>
        </>
      ) : (
        ""
      )}

      <div className="relative mb-2">
        <div className="absolute  left-2 z-10 text-[1.0rem] font-bold text-gray-500">
          +
        </div>
        <input
          className="relative w-full rounded-[4px] border px-2 py-1.5 pl-6 text-[0.65rem] outline-0
              max-sm:text-[0.55rem]"
          placeholder={`Add New Task`}
        ></input>
      </div>
      <div className="no-scrollbar overflow-y-scroll">
        {allTasks.value.map((value) => {
          if (!predicate(value)) return "";
          let hr = seen;
          seen = true;
          return (
            <div key={value.id} className="flex flex-col">
              {!hr ? "" : <hr className="my-2 w-full max-sm:my-1" />}
              <div className="ml-2 flex flex-row content-center text-[0.55rem]">
                <input
                  type="checkbox"
                  className="mr-2 mt-0.5 w-2.5 cursor-pointer"
                  checked={value.completed}
                  onChange={(event) =>
                    changeComplete(event.target.checked, value.id)
                  }
                />
                <div className="flex w-full cursor-pointer flex-row">
                  <label className="cursor-pointer">{value.title}</label>
                  <div className="ml-auto mr-4 font-medium">❯</div>
                </div>
              </div>
              <div className="ml-7 flex flex-row gap-1 text-[0.4rem]  font-semibold">
                {getAddList(value)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}