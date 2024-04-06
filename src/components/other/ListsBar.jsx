import { useRef, useState } from "react";
import {
  selectedSection,
  lists,
  listsNew,
  credentials, authed, backend
} from "../../Signals.jsx";

export default function ListsBar() {
  const [create, setCreate] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const listInputRef = useRef();

  const colorMap = useRef([
    "#a1fbd6",
    "#266fab",
    "#faafff",
    "#fbe2a1",
    "#5267d3",
    "#cc82b6",
    "#a1fbd6",
  ]);

  const checkValid = () => {
    for (let i = 0; i < lists.value.length; i++) {
      if (
        lists.value[i].title.toLowerCase() ===
        listInputRef.current.value.toLowerCase()
      ) {
        listInputRef.current.setCustomValidity("Invalid field.");
        return;
      }
    }
    listInputRef.current.setCustomValidity("");
  };

  const addList = () => {
    if (listInputRef.current.value === "") return;
    if (!listInputRef.current.checkValidity()) return;

    let list = {
      title: listInputRef.current.value,
      color: colorMap.current[colorIndex],
    };
    let arr = [...lists.value];
    //console.log(JSON.stringify(list));
    fetch(`${backend.value}user/tasklists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(credentials.value.login + ":" + credentials.value.password),
      },
      body: JSON.stringify(list),
    })
      .then((response) => {
        if (response.status === 401) {
          authed.value=false;
          return null;
        }
        return response.json();
      })
      .then((data) => {
        //console.log(arr)
        arr.push(data.taskList);
        listInputRef.current.value = "";
        lists.value = arr;
        setTimeout(() => {
          setCreate(false);
        }, 500);
      });
  };

  const getLists = () => {
    return lists.value.map((val) => {
      return (
        <div
          key={val.id}
          className={`${
            selectedSection.value.group === "lists" &&
            selectedSection.value.id === val.id
              ? "bg-gray-200"
              : ""
          } group flex cursor-pointer flex-row items-center gap-1 rounded-md
                              p-[0.25rem] font-medium transition-all ease-out hover:bg-gray-200`}
          onClick={() =>
            (selectedSection.value = { group: "lists", id: val.id })
          }
        >
          <div
            className={`mx-1 aspect-square w-3 rounded-[3px]`}
            style={{ backgroundColor: val.color }}
          ></div>
          {val.title}
          <div
            className={`${
              selectedSection.value.group === "lists" &&
              selectedSection.value.id === val.id
                ? "bg-gray-300"
                : ""
            } ml-auto w-[1.0rem] rounded-sm bg-gray-200 text-center
                        text-[0.45rem] font-bold transition-all ease-out group-hover:bg-gray-300`}
          >
            {listsNew.value[val.id] ? listsNew.value[val.id] : ""}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="mb-1 mt-3 px-3 text-[0.75rem] font-bold uppercase opacity-60">
        Lists
      </div>
      <div className="flex flex-col gap-0.5 px-3 text-[0.75rem]">
        {getLists()}
        <div
          className={`group flex cursor-pointer flex-row items-center gap-1  rounded-md
                    p-[0.25rem] font-medium transition-all ease-out hover:bg-gray-200`}
          onClick={() => setCreate((prev) => !prev)}
        >
          <div className="relative mx-1 flex aspect-square w-3 scale-[200%] text-center font-bold">
            <div className="absolute -top-[30.5%] left-[20%] scale-[1] opacity-50">
              +
            </div>
          </div>
          <div className="">Add New List</div>
        </div>
        <div
          className={`flex w-full overflow-hidden  ${
            create ? "h-[6.1rem] max-sm:h-[5.1rem]" : "h-0"
          } transition-all duration-500`}
        >
          <div
            className={`w-full ${
              create ? "" : "-translate-y-[6rem]"
            } flex h-fit origin-top flex-col rounded-md border p-2 transition-all duration-500 max-sm:p-1`}
          >
            <div className="relative">
              <div
                className="absolute left-[0.4rem] top-[0.45rem] aspect-square w-[0.75rem] rounded-[3.5px] border bg-red-500"
                style={{ backgroundColor: colorMap.current[colorIndex] }}
              ></div>
              <input
                type="text"
                placeholder="List Name"
                className={`w-full rounded-md border bg-gray-100 p-1 pl-6 invalid:border-red-500 focus:outline-0`}
                ref={listInputRef}
                onChange={() => checkValid()}
                minLength={3}
              />
            </div>

            <div className="no-scrollbar ml-0.5 mt-2 flex w-full flex-row justify-between overflow-x-hidden max-sm:mt-1">
              {colorMap.current.map((value, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      index === colorIndex
                        ? "rounded-[4px] border-gray-300"
                        : "border-transparent"
                    } box-border
                   border p-0.5 transition-all duration-300 ease-out max-sm:p-0`}
                  >
                    <div
                      className="aspect-square w-[0.75rem] min-w-[0.75rem] cursor-pointer rounded-[3.5px] border"
                      style={{ backgroundColor: value }}
                      onClick={() => setColorIndex(index)}
                    ></div>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-2 flex cursor-pointer justify-center rounded-lg bg-blue-500 py-0.5 text-white
           transition-all duration-500 ease-out hover:bg-blue-700 "
              onClick={() => {
                addList();
              }}
            >
              Done
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
