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

export const sameDay = (d1, d2) => {
  //console.log(d1+" "+d2)
  if (!d1 || !d2) return false;
  return (
    d1.toISOString().substring(0, 10) === d2.toISOString().substring(0, 10)
  );
};

export const isForToday = (task) => {
  const today = new Date();
  let isSameDay =
    today.toISOString().substring(0, 10) === task.startDate.substring(0, 10);

  return isSameDay;
};

export const isForTomorrow = (task) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  /*    console.log(tomorrow.toISOString().substring(0, 10));
      console.log(task.startDate.substring(0, 10));
      console.log(
        tomorrow.toISOString().substring(0, 10) ===
          task.startDate.substring(0, 10),
      );*/
  return (
    tomorrow.toISOString().substring(0, 10) === task.startDate.substring(0, 10)
  );
};

export const isForNextWeek = (task) => {
  const today = new Date();
  const nextWeek = new Date(today);

  // get begginning of next week
  nextWeek.setDate(nextWeek.getDate() + 8 - nextWeek.getDay());

  const endOfNextWeek = new Date(nextWeek);
  endOfNextWeek.setDate(endOfNextWeek.getDate() + 7);

  let isNextWeek =
    new Date(task.startDate) >= nextWeek &&
    new Date(task.startDate) < endOfNextWeek;

  return isNextWeek;
};

export const serializeDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Calculate the timezone offset
  const offset = -date.getTimezoneOffset();
  const offsetSign = offset >= 0 ? "+" : "-";
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(
    2,
    "0",
  );
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, "0");

  // Combine everything into the final string
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
};

export const getAddList = (value) => {
  let list = null;
  if (value.list !== -1) {
    let listIndex = lists.value.findIndex((i) => i.id === value.list);
    if (listIndex !== -1) list = lists.value[listIndex];
  }

  let today = new Date();
  let endDate = new Date(value.endDate);
  let isStale = today > endDate;

  return (
    <>
      {/* END DATE */}
      {value.endDate !== undefined ? (
        <>
          <div className="flex flex-row content-center items-center justify-center">
            <img src={dueDate} alt="" className="mr-1 w-[9px]" />
            <div className="">
              {new Date(Date.parse(value.endDate))
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
