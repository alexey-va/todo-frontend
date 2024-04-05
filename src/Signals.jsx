import { computed, effect, signal } from "@preact/signals-react";
import { isForToday } from "./myutils/Utils.jsx";

function isDataStale() {
  const lastUpdatedString = localStorage.getItem("lastUpdated");
  if (!lastUpdatedString) {
    return true;
  }

  const lastUpdated = new Date(lastUpdatedString);
  const thirtyMinutesAgo = new Date();
  thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

  return lastUpdated < thirtyMinutesAgo;
}

function getSignalFromLocalStorage(signalKey, defaultValue) {
  if (isDataStale()) {
    // If the data is considered stale, remove all items to start fresh
    localStorage.clear();
    return defaultValue;
  }

  const storedValueString = localStorage.getItem(signalKey);
  return storedValueString !== null ? JSON.parse(storedValueString) : defaultValue;
}

// Update the lastUpdated timestamp whenever data is saved
function updateLastUpdated() {
  localStorage.setItem("lastUpdated", new Date().toISOString());
}

// INTERNAL STATE - Adjusting the initialization to use getSignalFromLocalStorage and checking for stale data
export const editedSticker = signal({ type: "none" });
export const searchTags = signal(
  getSignalFromLocalStorage("searchTags", { tags: [] }),
);
export const selectedSection = signal(
  getSignalFromLocalStorage("selectedSection", { group: "tasks", id: 3 }),
);
export const authed = signal(
  getSignalFromLocalStorage("authed", false),
);
export const credentials = signal(
  getSignalFromLocalStorage("credentials", { login: "", password: "" }),
);

export const search = signal(
  getSignalFromLocalStorage("search", "")
);

{
  effect(() => {
    localStorage.setItem("searchTags", JSON.stringify(searchTags.value));
    updateLastUpdated();
  });

  effect(() => {
    localStorage.setItem("selectedSection", JSON.stringify(selectedSection.value));
    updateLastUpdated();
  });

  effect(() => {
    localStorage.setItem("authed", JSON.stringify(authed.value));
    localStorage.setItem("credentials", JSON.stringify(credentials.value));
    updateLastUpdated();
  });
}


export const tasksNew = computed(() => {
  let obj = {};
  obj.today = allTasks.value
    .filter(i => isForToday(i))
    .filter(i => lists.value.find((j) => j.id === i.list) !== undefined)
    .filter((i) => i.completed === false).length;

  obj.upcoming = allTasks.value
    .filter(i => isForToday(i))
    .filter(i => lists.value.find((j) => j.id === i.list) !== undefined)
    .filter((i) => i.completed === false).length;
  return obj;
});

export const calendarScroll = signal({ translate: 500, pointer: 0 });
export const listsNew = computed(() => {
  let obj = {};
  allTasks.value.forEach((value) => {
    if (value.list === undefined || value.list === null) return;
    if (value.completed) return;
    let endDate = new Date(value.endDate * 1000);
    let today = new Date();
    if (today > endDate) {
      return;
    }
    obj[value.list] = (obj[value.list] ? obj[value.list] : 0) + 1;
  });
  return obj;
});



// FROM BACKEND GET THIS

export const allTags = signal([]);

export const stickers = signal([]);

export const allTasks = signal([]);

export const lists = signal([]);
