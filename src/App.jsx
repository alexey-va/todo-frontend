
import { StickerWall } from "./components/content/StickerWall.jsx";
import Panel from "./components/other/Panel.jsx";
import Upcoming from "./components/content/Upcoming.jsx";
import {selectedSection} from "./Signals.jsx";
import BiggieToday from "./components/content/BiggieToday.jsx";
import Calendar from "./components/content/Calendar.jsx";
import ListView from "./components/content/ListView.jsx";

export default function App() {
  const getComponent = () => {
    if (selectedSection.value.group === "tasks") {
      if (selectedSection.value.id === 0) return <Upcoming />;
      else if (selectedSection.value.id === 1) return <BiggieToday />
      else if(selectedSection.value.id === 2) return <Calendar />
      else if (selectedSection.value.id === 3)
        return <StickerWall/>;
    } else if(selectedSection.value.group === "lists"){
      return <ListView listId={selectedSection.value.id} />
    }
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#BCCAB8]">
        <div className="flex h-[90%] max-h-[40rem] w-[90%] min-w-[375px]  max-w-5xl flex-row rounded-2xl
         bg-white p-4 shadow-2xl">
          <Panel/>
          <div className="w-full">{getComponent()}</div>
        </div>
      </div>
    </>
  );
}
