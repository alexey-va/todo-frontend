import {
  authed, backend, credentials,
  editedSticker,
  lists,
  listsNew, selectedSection,
  stickers,
  tasksNew
} from "../../Signals.jsx";

import Tasks from "./Tasks.jsx";
import NewCounter from "../other/NewCounter.jsx";
import { changeComplete, getAddList } from "../../Utils.jsx";

export default function TasksOfList({ listId }) {
  let list = lists.value.find((i) => i.id === listId);
  //console.log(typeof lists.value)
  if (list === null || list == undefined) list = [];

  const handleListDelete = (id) => {
    if (lists.value.length === 1) {
      //alert("Нельзя удалить последний список");
      return;
    }
    fetch(
      `${backend.value}user/tasklists`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(credentials.value.login + ":" + credentials.value.password),
        },
        body: JSON.stringify({ id: id }),
      },
    )
      .then((response) => {
        if (response.status === 401) {
          authed.value = false;
          return null;
        }
        return response.json();
      })
      .then((data) => {
        let result = [...lists.value];
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            result.splice(i, 1);
            lists.value = result.sort((a, b) => a.id - b.id);
          }
        }
        selectedSection.value = { group: "tasks", id: 0 };
      });
  };

  return (
    <div className="relative flex h-full flex-col px-4 pb-4 max-sm:px-2">
      <div className="flex flex-row items-center gap-4 pb-2 text-[1.75rem] font-semibold">
        <div className="">{list.title ? list.title : "List"}</div>

        {tasksNew.value.upcoming > 0 ? (
          <NewCounter
            count={listsNew.value[listId]}
            width="25px"
            fontSize="1rem"
          />
        ) : (
          ""
        )}
        <div className="flex items-center self-center sm:ml-auto">
          <button
            className={
              `rounded-md ${lists.value.length === 1 ? "bg-gray-500" : "bg-red-500"}  px-2 py-1 text-base text-white opacity-90`
            }
            onClick={() => handleListDelete(listId)}
          >
            Удалить
          </button>
        </div>
      </div>
      <div className="no-scrollbar grid h-full w-full grid-cols-1 grid-rows-1 gap-4 overflow-scroll">
        <Tasks
          changeComplete={changeComplete}
          getAddList={getAddList}
          predicate={(value) => value.list === list.id}
          defaultList={list.id}
          title={list.title}
          taskContainer={`list_${list.id}_container`}
        />
      </div>
    </div>
  );
}
