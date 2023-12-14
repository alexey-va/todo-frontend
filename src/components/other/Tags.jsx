import { allTags } from "../../Signals.jsx";

export default function Tags({ parentTagsSignal, onChange, add }) {
  return (
    <>
      <div className={`${add} text-[0.5rem]`}>
        <div
          className={`group m-0.5 inline-block rounded-[5px] bg-gray-200 px-3
          py-1 font-bold text-gray-600`}
        >
          <div className="relative">
            <div
              className="absolute -left-1 -top-[10%] w-0 scale-150
             cursor-pointer opacity-0 group-hover:w-2.5 group-hover:opacity-80"
            >
              +
            </div>
            <div className="cursor-pointer whitespace-nowrap transition-all group-hover:pl-2">
              Add Tag
            </div>
            <div
              className={`fixed z-50 flex max-w-[21rem]  origin-top-left scale-0 flex-wrap gap-0 rounded-xl
                bg-white transition-all duration-300 ease-out group-hover:h-fit group-hover:w-fit group-hover:scale-100
                 group-hover:py-1 ${
                   allTags.value.filter((val) =>
                     parentTagsSignal.value.tags.includes(val.id),
                   ).length < allTags.value.length
                     ? "px-1"
                     : ""
                 }`}
            >
              {allTags.value.map((value) => {
                return (
                  <div
                    key={value.id}
                    className={`${
                      parentTagsSignal.value.tags !== null &&
                      parentTagsSignal.value.tags.includes(value.id)
                        ? ""
                        : "m-0.5 hidden w-fit scale-100 pl-2.5 pr-2.5 group-hover:inline-block"
                    }
                    group w-0 scale-0 cursor-pointer self-start whitespace-nowrap 
                      rounded-[5px] py-1 text-gray-600 transition-all duration-100 hover:saturate-200
                      `}
                    style={{ backgroundColor: value.color }}
                    onClick={() => {
                      let arr = [...parentTagsSignal.value.tags];
                      arr.push(value.id);
                      parentTagsSignal.value = {
                        ...parentTagsSignal.value,
                        tags: arr,
                      };
                      onChange();
                    }}
                  >
                    <div className="flex gap-2">
                      <div>{value.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${add} flex h-fit w-fit flex-wrap text-[0.5rem] font-bold`}
      >
        {allTags.value.map((value) => {
          let isShown =
            parentTagsSignal.value.tags !== null &&
            parentTagsSignal.value.tags.includes(value.id);
          return (
            <div
              key={value.id}
              className={`${isShown ? "w-fit mr-1" : "w-0"}`}
            >
              <div
                className={`${isShown ? "" : "scale-0"} m-0.5 inline-block w-full cursor-pointer
                    self-start  whitespace-nowrap rounded-[5px] py-1 
                      pl-2.5 pr-2.5 text-gray-600 transition-all hover:saturate-200
                      `}
                style={{ backgroundColor: value.color }}
                onClick={() => {
                  parentTagsSignal.value = {
                    ...parentTagsSignal.value,
                    tags: parentTagsSignal.value.tags.filter(
                      (el) => el !== value.id,
                    ),
                  };
                  onChange();
                }}
              >
                <div className="flex gap-2">
                  <div>{value.name}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
