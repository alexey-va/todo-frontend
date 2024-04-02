import { allTasks, lists } from "../Signals.jsx";
import dueDate from "../assets/due-date.svg";

export function hexToRgb(hex) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return "" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
  throw new Error("Bad Hex");
}

export const toPix = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const changeComplete = (checked, id) => {
  let arr = [...allTasks.value];
  let index = arr.findIndex((i) => i.id === id);
  arr[index].completed = checked;
  allTasks.value = arr;
};

export const fromTimestamp = (timestamp) => {
  return new Date(timestamp*1000);
}

export const sameDay = (d1, d2) => {
  //console.log(d1,d2)
  // check if d1 and d2 are timestamps and convert them to Date objects if necessary
  let date1 = typeof d1 === "number" ? new Date(d1*1000) : d1;
  let date2 = typeof d2 === "number" ? new Date(d2*1000) : d2;
  if (!date1 || !date2) return false;
  return (
    date1.toISOString().substring(0, 10) === date2.toISOString().substring(0, 10)
  );
};

export const isForToday = (task) => {
  const today = new Date();
  let taskDate = new Date(task.startDate*1000);
  let isSameDay =
    today.toISOString().substring(0, 10) === taskDate.toISOString().substring(0, 10);

  return isSameDay;
};

export const isForTomorrow = (task) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let taskDate = new Date(task.startDate*1000);
  return (
    tomorrow.toISOString().substring(0, 10) === taskDate.toISOString().substring(0, 10)
  );
};

export const isForNextWeek = (task) => {
  const today = new Date();
  const nextWeek = new Date(today);

  // get begginning of next week
  nextWeek.setDate(nextWeek.getDate() + 8 - nextWeek.getDay());

  const endOfNextWeek = new Date(nextWeek);
  endOfNextWeek.setDate(endOfNextWeek.getDate() + 7);
  let taskDate = new Date(task.startDate*1000);

  let isNextWeek =
    taskDate >= nextWeek &&
    taskDate < endOfNextWeek;
  return isNextWeek;
};

export const serializeDate = (date) => {
  return date.getTime();
};

export const getAddList = (value) => {
  let list = null;
  if (value.list !== -1) {
    let listIndex = lists.value.findIndex((i) => i.id === value.list);
    if (listIndex !== -1) list = lists.value[listIndex];
  }

  let today = new Date();
  let endDate = fromTimestamp(value.endDate);
  //console.log("Today: ", today, "End: ", value.endDate);
  let isStale = today > endDate;

  return (
    <>
      {/* END DATE */}
      {value.endDate !== undefined ? (
        <>
          <div className="flex flex-row content-center items-center justify-center">
            <img src={dueDate} alt="" className="mr-1 w-[9px]" />
            <div className="">
              {fromTimestamp(value.endDate)
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
      {/* END DATE */}


      {/* SEPARATOR 1 */}
      {value.endDate !== undefined && list != null ? (
        <>
          <div className="mx-0.5 w-[0.5px] self-stretch bg-gray-500 opacity-30"></div>
        </>
      ) : (
        ""
      )}
      {/* SEPARATOR 1 */}

      {/* LIST */}
      {list !== null ? (
        <>
          <div className="flex flex-row content-center items-center justify-center">
            <div
              className={`mr-1 aspect-square h-1.5 w-1.5 rounded-[2px]`}
              style={{ backgroundColor: list.color }}
            ></div>
            <div className="">{list.title}</div>
            <div className="h-[1px] w-[1px]"></div>
          </div>
        </>
      ) : (
        ""
      )}
      {/* LIST */}



      {/* SEPARATOR 2 */}
      {value.list != null && isStale ? (
        <>
          <div className="mx-0.5 w-[0.5px] self-stretch bg-gray-500 opacity-30"></div>
        </>
      ) : (
        ""
      )}
      {/* SEPARATOR 2 */}

      {/* STALE */}
      {isStale ? (
        <>
          <div className="flex flex-row content-center items-center justify-center">
            <div className="text-red-500">Stale</div>
          </div>
        </>
      ) : (
        ""
      )}
      {/* STALE */}
    </>
  );
};
