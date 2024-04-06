import { tasksNew } from "../../Signals.jsx";
import Tasks from "./Tasks.jsx";
import NewCounter from "../other/NewCounter.jsx";
import { changeComplete, getAddList, isForNextWeek, isForToday, isForTomorrow } from "../../Utils.jsx";

export default function TasksUpcoming() {
  let seen = [false, false, false];
  let nexWeekMonday9AM = new Date();
  nexWeekMonday9AM.setDate(nexWeekMonday9AM.getDate() + 8 - nexWeekMonday9AM.getDay());
  nexWeekMonday9AM.setHours(9, 0, 0, 0);

  let nextDay9AM = new Date();
  nextDay9AM.setDate(nextDay9AM.getDate() + 1);
  nextDay9AM.setHours(9, 0, 0, 0);


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
           overflow-scroll pb-1 max-sm:flex max-sm:flex-col max-sm:overflow-y-scroll"
        >
          {/*TODAY*/}
          <div className="col-span-full">
            <Tasks
              changeComplete={changeComplete}
              seen={seen}
              getAddList={getAddList}
              predicate={(value) => isForToday(value)}
              title="Today"
              taskContainer="today_container"
            />
          </div>

          <div
            className="col-span-full flex w-full flex-row justify-between gap-4 max-lg:flex-col max-lg:justify-start">
            <div className="w-full">
              {/*Tomorrow*/}
              <Tasks
                changeComplete={changeComplete}
                seen={seen}
                getAddList={getAddList}
                predicate={(value) => isForTomorrow(value)}
                title="Tomorrow"
                startDate={nextDay9AM}
                taskContainer="tomorrow_container"
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
                startDate={nexWeekMonday9AM}
                taskContainer="next_week_container"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
