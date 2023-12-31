import { computed, effect, signal } from "@preact/signals-react";

export const allTags = signal([
  {
    title: "Lol 1",
    color: "#D1EAED",
    id: 0,
  },
  {
    title: "Kek 2",
    color: "#FFDADA",
    id: 1,
  },
  {
    title: "Urgent",
    color: "#dd77ed",
    id: 2,
  },
]);

export const searchTags = signal(
  localStorage.getItem("searchTags") !== null ? { tags: [] } : { tags: [] },
);

export const selectedSection = signal(
  localStorage.getItem("selectedSection") !== null
    ? JSON.parse(localStorage.getItem("selectedSection"))
    : { group: "tasks", id: 3 },
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
}


export const stickers = signal([
  {
    title: "Social Media",
    text: "Lorem Ipsum is simply ",
    color: "#FFDBDB",
    tags: [0, 1],
    id: 0,
  },
  {
    title: "Content",
    text: "would nee time to lorem ipsum",
    color: "#D1EAED",
    tags: [0, 1],
    id: 1,
  },
  {
    title: "Email A/B Tests",
    text:
      "would nee time to lorem ipsum would nee time to lorem ipsum would nee time to lorem ipsum would nee time to lorem ipsum" +
      "would nee time to lorem ipsum would nee time to lorem ipsum would nee time to lorem ipsum would nee time to lorem ipsum" +
      "would nee time to lorem ipsum would nee time to lorem ipsum would nee time to lorem ipsum would nee time to lorem ipsum",
    color: "#FFDADA",
    tags: [0, 1],
    id: 2,
  },
  {
    title: "Banner Ads",
    text: "would nee time to lorem ipsum",
    color: "#FFD4A9",
    tags: [0],
    id: 3,
  },
]);

export const editedSticker = signal({ type: "none" });

export const allTasks = signal([
  {
    title: "Reserach stuff",
    completed: false,
    start: "2023-12-12T00:00:00+03:00",
    end: "2023-12-12T00:00:00+03:00",
    upcoming: 0,
    list: 2,
    id: 0,
  },
  {
    title: "Reserach stuff 1",
    completed: true,
    start: "2023-12-15T03:00:00+03:00",
    end: "2023-12-15T18:30:00+03:00",
    upcoming: 0,
    list: 1,
    id: 1,
  },
  {
    title: "Reserach stuff 2",
    completed: true,
    start: "2023-12-15T08:00:00+03:00",
    end: "2023-12-15T16:00:00+03:00",
    upcoming: 0,
    list: 0,
    id: 2,
  },
  {
    title: "Reserach stuff 3",
    completed: true,
    start: "2023-12-15T09:00:00+03:00",
    end: "2023-12-15T13:00:00+03:00",
    upcoming: 0,
    list: 1,
    id: 3,
  },
  {
    title: "Next dayt 2",
    completed: true,
    start: "2023-12-14T01:00:00+03:00",
    end: "2023-12-14T03:50:00+03:00",
    upcoming: 1,
    id: 4,
  },
  {
    title: "Next week a lot",
    completed: false,
    start: "2023-4-29",
    end: "2023-12-16T00:00:00+03:00",
    upcoming: 2,
    list: 2,
    id: 5,
  },
  {
    title: "Next week a lot",
    completed: false,
    start: "2023-4-29",
    end: "2023-12-16T00:00:00+03:00",
    upcoming: 2,
    list: 2,
    id: 6,
  },
  {
    title: "Next week a lot",
    completed: false,
    start: "2023-4-29",
    end: "2023-12-16T00:00:00+03:00",
    upcoming: 2,
    list: 2,
    id: 8,
  },
  {
    title: "Next week a lot",
    completed: false,
    start: "2023-4-29",
    end: "2023-12-16T00:00:00+03:00",
    upcoming: 2,
    list: 2,
    id: 9,
  },
  {
    title: "Next week a lot",
    completed: false,
    start: "2023-4-29",
    end: "2023-12-16T00:00:00+03:00",
    upcoming: 2,
    list: 2,
    id: 10,
  },
  {
    title: "Next week a lot",
    completed: false,
    start: "2023-4-29",
    end: "2023-12-16T00:00:00+03:00",
    upcoming: 2,
    list: 2,
    id: 11,
  }
]);

export const tasksNew = computed(() => {
  let obj = {}
  obj.today=allTasks.value
    .filter((i) => i.upcoming === 0)
    .filter(i => i.completed === false)
    .length;

  obj.upcoming=allTasks.value.filter(
    (i) => i.upcoming === 0 || i.upcoming === 1 || i.upcoming === 2,
  )
    .filter(i => i.completed === false)
    .length;
  return obj;
});

export const listsNew = computed(() => {
  let obj = {}
  allTasks.value.forEach((value) => {
    if(value.list === undefined || value.list === null) return;
    if(value.completed) return;
    obj[value.list] = (obj[value.list] ? obj[value.list] : 0) + 1;
  })
  return obj;
})

export const lists = signal([
  { title: "Personal", color: "#FF6B6B",  id: 0 },
  { title: "Work", color: "#66D9E8",  id: 1 },
  { title: "List 1", color: "#FFD43B", id: 2 },
]);

export const calendarScroll = signal({translate: 500, pointer: 0})
