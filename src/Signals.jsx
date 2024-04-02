import { computed, effect, signal } from "@preact/signals-react";

// INTERNAL STATE
export const editedSticker = signal({ type: "none" });
export const searchTags = signal(
  localStorage.getItem("searchTags") !== null ? { tags: [] } : { tags: [] },
);
export const selectedSection = signal(
  localStorage.getItem("selectedSection") !== null
    ? JSON.parse(localStorage.getItem("selectedSection"))
    : { group: "tasks", id: 3 },
);

export const authed = signal(
  localStorage.getItem("authed") === "true" || false,
);

export const credentials = signal(
  localStorage.getItem("credentials") !== null
    ? JSON.parse(localStorage.getItem("credentials"))
    : { login: "", password: "" },
);

{
  effect(() =>
    localStorage.setItem("searchTags", JSON.stringify(searchTags.value.tags)),
  );

  effect(() =>
    localStorage.setItem(
      "selectedSection",
      JSON.stringify(selectedSection.value),
    ),
  );

  effect(() => {
    localStorage.setItem("authed", authed.value);
    localStorage.setItem("credentials", JSON.stringify(credentials.value));
  });
}

export const tasksNew = computed(() => {
  let obj = {};
  obj.today = allTasks.value
    .filter((i) => i.upcoming === 0)
    .filter((i) => i.completed === false).length;

  obj.upcoming = allTasks.value
    .filter((i) => i.upcoming === 0 || i.upcoming === 1 || i.upcoming === 2)
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
