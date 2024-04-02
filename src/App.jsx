import { StickerWall } from "./components/content/StickerWall.jsx";
import Panel from "./components/other/Panel.jsx";
import TasksUpcoming from "./components/content/TasksUpcoming.jsx";
import {
  allTags,
  allTasks, authed, credentials,
  lists,
  selectedSection,
  stickers
} from "./Signals.jsx";
import TasksOfToday from "./components/content/TasksOfToday.jsx";
import Calendar from "./components/content/Calendar.jsx";
import TasksOfList from "./components/content/TasksOfList.jsx";
import { useEffect, useState } from "react";
import Login from "./Login.jsx";

export default function App() {

  const getComponent = () => {
    if (selectedSection.value.group === "tasks") {
      if (selectedSection.value.id === 0) return <TasksUpcoming />;
      else if (selectedSection.value.id === 1) return <TasksOfToday />;
      else if (selectedSection.value.id === 2) return <Calendar />;
      else if (selectedSection.value.id === 3) return <StickerWall />;
    } else if (selectedSection.value.group === "lists") {
      return <TasksOfList listId={selectedSection.value.id} />;
    }
  };

  const loadData = () => {
    console.log("credentials", credentials.value.login, credentials.value.password)
    return fetch("https://todo-back.alexeyav.ru/api/v1/user", {
      method: "GET",
      headers: {
        "Authorization": "Basic " + btoa(credentials.value.login + ":" + credentials.value.password),
      }
    })
      .then((response) => {
        if (response.status === 401) {
          authed.value=false;
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data === undefined || data === null) {
          return false;
        }
        console.log("Loaded: ", data);
        allTags.value = data.tags.sort((a, b) => a.id - b.id);
        lists.value = data.taskLists.sort((a, b) => a.id - b.id);
        allTasks.value = data.tasks.sort((a, b) => a.id - b.id);
        stickers.value = data.stickers.sort((a, b) => a.id - b.id);
        authed.value = true;
        return true;
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#BCCAB8]">
        {authed.value ? (
          <div
            className="flex h-[90%] max-h-[60rem] w-[90%] min-w-[375px] max-w-5xl
         flex-row rounded-2xl max-sm:rounded-none  bg-white max-sm:p-0 max-sm:pb-2 p-4 shadow-2xl max-sm:h-full max-sm:max-h-full max-sm:w-full"
          >
            <Panel />
            <div className="w-full">{getComponent()}</div>
          </div>
        ) : (
          <Login loadData={loadData}/>
        )}
      </div>
    </>
  );
}
