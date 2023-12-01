import React, {useState} from 'react'
import search from './assets/icons8-search.svg'
import Tasks from "./Tasks.jsx";
import Lists from "./Lists.jsx";
import Tags from "./Tags.jsx";
import {Wall} from "./Wall.jsx";

export default function App(){

    const [burger, setBurger] = useState(false)
    const [sec, setSec] = useState(-1)
    const [lists, setLists] = useState([
        {name: "Personal", color: "#FF6B6B", new: 12, id: 4},
        {name: "Work", color: "#66D9E8", new: 5, id: 5},
        {name: "List 1", color: "#FFD43B", new: 0, id: 6},
    ])
    const [tags, setTags] = useState([
        {name: "Tag 1", color: "#D1EAED", id: 0},
        {name: "Tag 2", color: "#FFDADA", id: 1},
        {name: "Tag 1", color: "#D1EAED", id: 0},
    ])
    const [notes, setNotes] = useState([
        {
            theme: "Social Media",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            color: "#FFDBDB"
        },
        {
            theme: "Content",
            text: "would nee time to lorem ipsum",
            color: "#D1EAED"
        },
        {
            theme: "Email A/B Tests",
            text: "would nee time to lorem ipsum",
            color: "#FFDADA"
        },
        {
            theme: "Banner Ads",
            text: "would nee time to lorem ipsum",
            color: "#FFD4A9"
        }
    ])

        return <>
            <div className="bg-[#BCCAB8] w-full h-screen flex items-center justify-center">

                <div className="bg-white max-w-5xl max-h-[40rem] min-w-[20rem]  h-[90%] rounded-2xl shadow-2xl flex flex-row p-4">
                    <div className="overflow-y-scroll no-scrollbar bg-[#F4F4F4] grow-0 rounded-xl py-2">

                        <div className="flex justify-between font-semibold text-sm px-3 relative">
                            <div className="">Menu</div>
                            <div className="absolute max-w-[1rem] w-[8%]  h-full right-4 cursor-pointer"
                                 onClick={() => setBurger(o => !o)}>
                                <span
                                    className={`${burger ? "transform rotate-45 translate-y-1" : ""} transition-all ease-out absolute w-full h-[1.5px] top-1 rounded-lg bg-gray-600`}></span>
                                <span
                                    className={`${burger ? "hidden" : ""} absolute w-full h-[1.5px] transition-all ease-out top-2 rounded-lg bg-gray-600`}></span>
                                <span
                                    className={`${burger ? "transform -rotate-45 -translate-y-1" : ""} transition-all ease-out absolute w-full h-[1.5px] top-3 rounded-lg bg-gray-600`}></span>
                            </div>
                        </div>

                        <div className="px-3 py-1 pb-0 flex">
                            <div className="relative w-full">
                                <img
                                    className="absolute w-3.5 opacity-50 top-3 left-2 "
                                    src={search} alt="LUL"/>
                                <input className="bg-transparent rounded-lg border my-2 opacity-50
                            text-left indent-7 text-xs py-0.5 font-semibold w-full border-gray-500"
                                       type="text" placeholder="Search"/>
                            </div>
                        </div>

                        <Tasks selected={sec} setSelected={setSec} />
                        <hr className="my-3 mx-3"/>
                        <Lists selected={sec} setSelected={setSec} lists={lists} setLists={setLists}/>
                        <hr className="my-3 mx-3"/>
                        <Tags tags={tags} setTags={setTags} />

                    </div>
                    <div className="basis-[70%]">
                        <Wall notes={notes} />
                    </div>

                </div>



            </div>
        </>
}