import StickerPopup from "./StickerPopup.jsx";
import {searchTags, editedSticker, stickers} from "../../Signals.jsx";

export function StickerWall() {
  return (
    <>
      <div className="relative flex h-full flex-col px-4">
        <StickerPopup/>
        <div className="flex items-center pb-2 text-[1.75rem] font-semibold">
          <div className="">Sticky Wall</div>
        </div>
        <div className="no-scrollbar h-full overflow-y-scroll rounded-lg border">
          <div className="grid h-max grid-cols-3 gap-3 p-2 max-md:grid-cols-2 max-sm:grid-cols-1">
            {stickers.value.map((value) => {
              let key = value.id
              if (
                searchTags.value.tags.length > 0 &&
                !searchTags.value.tags.every((r) => value.tags.includes(r))
              )
                return "";

              return (
                <div
                  className={`no-scrollbar flex aspect-square cursor-pointer
                  flex-col overflow-y-scroll rounded-lg p-2 drop-shadow-md max-sm:aspect-auto
                  `}
                  style={{ backgroundColor: value.color }}
                  key={`${key}`}
                  onClick={() =>editedSticker.value={
                    type: "edit", title: value.title, text: value.text,
                    color: value.color, id: value.id, tags: value.tags
                  }}
                >
                  <div className="mb-1 text-[0.7rem] font-bold">
                    {value.title}
                  </div>

                  <div className="text-[0.6rem] max-sm:mb-2">{value.text}</div>
                </div>
              );
            })}

            <div
              className="flex aspect-square min-w-[6rem] cursor-pointer items-center
               justify-center rounded-lg bg-gray-200 p-2 pb-5 text-[3rem] drop-shadow-md"
              onClick={() => editedSticker.value={
                type: "edit", title: "", text: "", color: "#fff1f1", tags: []
              }}
            >
              <div className="">+</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
