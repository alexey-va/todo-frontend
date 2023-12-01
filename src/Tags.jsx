export default function Tags({ tags, setTags }) {
  return (
    <>
      <div className="mb-1 mt-3 px-3 text-[0.55rem] font-bold uppercase opacity-60">
        Tags
      </div>

      <div className="px-3 text-[0.6rem] font-bold">
        {tags.map((value) => {
          return (
            <>
              <div
                className="m-0.5 inline-block cursor-pointer self-start rounded-[5px] bg-green-200 px-2.5
              py-1 text-gray-600 hover:saturate-200"
                id={value.id}
                style={{ backgroundColor: value.color }}
              >
                <div>{value.name}</div>
              </div>
            </>
          );
        })}
        <div
          className="m-0.5 inline-block cursor-pointer rounded-[5px] bg-gray-200 px-3
              py-1 text-gray-600 hover:saturate-[300%]"
        >
          <div className="pl-2 relative">
              <div className="absolute -left-1 -top-1 text-[0.8rem]">+</div>
              Add Tag
          </div>
        </div>
      </div>
    </>
  );
}
