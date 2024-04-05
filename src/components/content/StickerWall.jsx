import StickerEditor from "../other/StickerEditor.jsx";
import { searchTags, editedSticker, stickers, search } from "../../Signals.jsx";

export function StickerWall() {

  const editSticker = (value) => {
    editedSticker.value={
      type: "edit", title: value.title, text: value.text,
      color: value.color, id: value.id, tags: value.tags
    }
  }

  const createNewSticker = () => {
    editedSticker.value={
      type: "create", title: "", text: "", color: null, tags: []
    }
  }

  return (
    <>
      <div className="relative flex h-full flex-col px-4 max-sm:px-2  pb-4">
        <StickerEditor/>
        <div className="flex items-center pb-2 text-[1.75rem] font-semibold">
          <div className="">Sticky Wall</div>
        </div>
        <div className="no-scrollbar h-full overflow-y-scroll rounded-lg border">
          <div className="grid h-max grid-cols-2 gap-3 p-2 max-md:grid-cols-2 max-sm:grid-cols-1">
            {stickers.value.map((value) => {
              let key = value.id
              let tagNotMatch = searchTags.value.tags.length > 0 && !searchTags.value.tags.every((r) => value.tags.includes(r))
              if (tagNotMatch) return "";

              let ifSearchNotMatch = search.value.length > 0 && value.title.toLowerCase().indexOf(search.value.toLowerCase()) === -1;
              if (ifSearchNotMatch) return "";


              return (
                <div
                  className={`flex aspect-square cursor-pointer font-mono
                  flex-col overflow-y-hidden rounded-lg p-2 drop-shadow-md max-sm:aspect-auto
                  `}
                  style={{ backgroundColor: value.color }}
                  key={`${key}`}
                  onClick={() =>editSticker(value)}
                >
                  <div className="overflow-scroll no-scrollbar">
                  <div className="mb-1 text-[0.7rem] font-bold">
                    {value.title}
                  </div>

                  <div className="text-[0.6rem] max-sm:mb-2">{value.text}</div>
                  </div>
                </div>
              );
            })}

            <div
              className="flex aspect-square min-w-[6rem] cursor-pointer items-center
               justify-center rounded-lg bg-gray-200 p-2 pb-5 text-[3rem] drop-shadow-md"
              onClick={() => createNewSticker()}
            >
              <div className="">+</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
