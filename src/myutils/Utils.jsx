import { allTasks, lists } from "../Signals.jsx";
import dueDate from "../assets/due-date.svg";


export const toPix = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export const changeComplete = (checked, id) => {
  let arr = [...allTasks.value];
  let index = arr.findIndex((i) => i.id === id);
  arr[index].completed = checked;
  allTasks.value = arr;
};

export const getAddList = (value) => {
  let list = null;
  if (value.list !== -1) {
    let listIndex = lists.value.findIndex((i) => i.id === value.list);
    if (listIndex !== -1) list = lists.value[listIndex];
  }

  return (
    <>
      {value.end !== undefined ? (
        <>
          <div className="flex flex-row content-center items-center justify-center">
            <img src={dueDate} alt="" className="mr-1 w-[9px]" />
            <div className="">
              {new Date(Date.parse(value.end))
                .toLocaleDateString("pl", {
                  day: "numeric",
                  month: "numeric",
                  year: "2-digit",
                })
                .replaceAll(".", "-")}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {value.end !== undefined && list != null ? (
        <>
          <div className="mx-0.5 w-[0.5px] self-stretch bg-gray-500 opacity-30"></div>
        </>
      ) : (
        ""
      )}
      {list !== null ? (
        <>
          <div className="flex flex-row content-center items-center justify-center">
            <div
              className={`mr-1 aspect-square h-1.5 w-1.5 rounded-[2px]`}
              style={{ backgroundColor: list.color }}
            ></div>
            <div className="">{list.name}</div>
            <div className="h-[1px] w-[1px]"></div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};