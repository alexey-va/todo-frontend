import { tasksNew } from "../../Signals.jsx";
import Tasks from "./Tasks.jsx";
import NewCounter from "../other/NewCounter.jsx";
import { changeComplete, getAddList, isForNextWeek, isForToday, isForTomorrow } from "../../myutils/Utils.jsx";

export default function TasksUpcoming() {
  let seen = [false, false, false];



  return (
    <>
      <div className="relative flex h-full flex-col px-4 max-sm:px-2">
        <div className="flex flex-row items-center gap-4 pb-2 text-[1.75rem] font-semibold">
          <div className="">Upcoming</div>
          {tasksNew.value.upcoming > 0 ? (
            <NewCounter
              count={tasksNew.value.upcoming}
              width="25px"
              fontSize="1rem"
            />
          ) : (
            ""
          )}
        </div>
        <div
          className="no-scrollbar grid h-[92%] grid-cols-2 grid-rows-[fit-content(40%)_minmax(60%,auto)] gap-4
           overflow-clip max-sm:flex max-sm:flex-col max-sm:overflow-y-scroll"
        >
          {/*TODAY*/}
          <div className="col-span-full">
            <Tasks
              changeComplete={changeComplete}
              seen={seen}
              getAddList={getAddList}
              predicate={(value) => isForToday(value)}
              title="Today"
            />
          </div>

          <div
            className="col-span-full flex w-full flex-row justify-between gap-4 max-md:flex-col max-md:justify-start">
            <div className="w-full">
              {/*Tomorrow*/}
              <Tasks
                changeComplete={changeComplete}
                seen={seen}
                getAddList={getAddList}
                predicate={(value) => isForTomorrow(value)}
                title="Tomorrow"
              />
            </div>
            <div className="w-full ">
              {/*Next Week*/}
              <Tasks
                changeComplete={changeComplete}
                seen={seen}
                getAddList={getAddList}
                predicate={(value) => isForNextWeek(value)}
                title="Next Week"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
