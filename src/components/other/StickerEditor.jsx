import Tags from "./Tags.jsx";
import { authed, backend, credentials, editedSticker, stickers } from "../../Signals.jsx";
import { useRef } from "react";

export default function StickerEditor() {
  const title = useRef();
  const text = useRef();
  const formRef = useRef();
  const clear = () => {
    editedSticker.value = { type: "none" };
    formRef.current.reset();
  };

  const onChange = () => {
    editedSticker.value.modified = true;
  };

  const checkValid = () => {
    if (title.current.value.length < 3) title.current.setCustomValidity("none");
    else title.current.setCustomValidity("");
  };

  const getUpdateData = () => {
    checkValid();
    if (!editedSticker.value.modified) return;
    if (!title.current.checkValidity()) {
      return;
    }
    let dict = { ...editedSticker.value };
    delete dict["modified"];
    delete dict["type"];
    console.log(
      "Credentials: ",
      credentials.value.login,
      credentials.value.password,
    );

    fetch(`${backend.value}user/stickers`, {
      method: editedSticker.value.type === "edit" ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(credentials.value.login + ":" + credentials.value.password),
      },
      body: JSON.stringify(dict),
    })
      .then((response) => {
        if (response.status === 401) {
          authed.value=false;
          return null;
        }
        return response.json();
      })
      .then((data) => {
        let sticker = data.sticker;
        let result = [...stickers.value];
        if (editedSticker.value.type === "edit") {
          for (let i = 0; i < result.length; i++) {
            if (result[i].id === sticker.id) {
              result[i] = sticker;
              stickers.value = result.sort((a, b) => a.id - b.id);
            }
          }
        } else {
          result.push(sticker);
          stickers.value = result.sort((a, b) => a.id - b.id);
        }
        clear();
      });
  };

  const handleDelete = () => {
    fetch(
      `${backend.value}user/stickers?local_id=${editedSticker.value.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(credentials.value.login + ":" + credentials.value.password),
        },
      },
    )
      .then((response) => {
        if (response.status === 401) {
          authed.value=false;
          return null;
        }
        return response.json();
      })
      .then((data) => {
        let result = [...stickers.value];
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === editedSticker.value.id) {
            result.splice(i, 1);
            stickers.value = result.sort((a, b) => a.id - b.id);
          }
        }
        clear();
      });
  };

  return (
    <>
      <form ref={formRef}>
        <div
          className={`fixed left-0 top-0 z-[99] flex h-screen w-screen items-center justify-center ${
            editedSticker.value.type === "none" ? "scale-0" : ""
          }
      ${
        editedSticker.value.type !== "none" ? "z-[2]" : "-z-[1]"
      } fixed left-0 top-0 h-screen w-screen cursor-pointer 
       backdrop-blur-[2px] transition-all duration-150 ease-out`}
          onMouseDown={() => clear()}
        >
          <div
            className={`border-1 left-[10%] z-[10] flex min-h-[36rem] min-w-[26rem] cursor-default flex-col gap-2
            rounded-md bg-white p-3 shadow-2xl shadow-gray-600 transition-all duration-300 ease-out max-sm:min-w-full`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <textarea
              className={`no-scrollbar h-[2.3rem] resize-none overflow-hidden whitespace-nowrap rounded-md
                 border-red-500 bg-gray-200 p-2 drop-shadow invalid:border
                focus:outline-0`}
              placeholder={`Заголовок`}
              defaultValue={editedSticker.value.title}
              ref={title}
              minLength={3}
              onChange={() => {
                editedSticker.value.modified = true;
                editedSticker.value.title = title.current.value;
                checkValid();
              }}
            />
            <div className="flex flex-grow">
              <div className="h-auto w-full">
                <textarea
                  className={`h-full w-full resize-none rounded-md bg-gray-200 p-2 drop-shadow focus:outline-0`}
                  placeholder={`Текст`}
                  defaultValue={editedSticker.value.text}
                  ref={text}
                  onChange={() => {
                    editedSticker.value.modified = true;
                    editedSticker.value.text = text.current.value;
                  }}
                />
              </div>
            </div>

            {/*            <div className="flex flex-wrap">
              {editedSticker.value.type !== "none" ? (
                <Tags
                  add={`text-[0.8rem]`}
                  parentTagsSignal={editedSticker}
                  onChange={onChange}
                />
              ) : (
                ""
              )}
            </div>*/}

            <button
              className={`rounded-md bg-blue-500 p-2 text-lg font-semibold text-white transition-all
              duration-500 ease-out hover:bg-blue-700`}
              type="button"
              onMouseUp={() => getUpdateData()}
            >
              {editedSticker.value.type === "edit" ? "Изменить" : "Создать"}
            </button>

            {editedSticker.value.type === "edit" ? (
              <>
                <button
                  className={`rounded-md bg-red-500 p-2 text-lg font-semibold text-white transition-all
                  duration-500 ease-out hover:bg-red-700`}
                  type="button"
                  onMouseUp={() => handleDelete()}
                >
                  Удалить
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </>
  );
}
