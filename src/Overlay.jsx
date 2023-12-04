export default function Overlay({ clear, index }) {
  return (
    <>
      <div className={`${index >= -1 ? "z-10 opacity-100" : "opacity-0 -z-[1]"} backdrop-blur-[2px] fixed w-screen h-screen top-0 left-0 
       duration-150 ease-out transition-all`}
           onClick={() => clear()}>

      </div>
    </>
  );
}