import { useState } from 'react'
import Header from '../../../components/Layout/Header.jsx'
import Sidebar from '../../../components/Layout/Sidebar.jsx'
import NoteEditModal from '../../../features/notes/components/NoteEditModal.jsx'
// import NoteCard from '../../../features/notes/components/NoteCard.jsx'
import '../../../assets/styles/App.css'

function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className="relative h-screen w-screen bg-gray-400">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="ml-0 flex flex-col h-full transition-all duration-300">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-y-visible pt-6 pl-6 pr-0 pb-o">

                    {/* main content container */}
                    <div className="flex col-auto h-full">
                        {/* column 1: list of notes */}
                        <div className={"bg-gray-200 h-auto w-96 rounded-tl-3xl p-10"}>
                            {/* row 1: titel */}
                            <div className={"flex col-auto w-full"}>
                                {/* col 1: title */}
                                <div className={"w-1/2 text-left"}>
                                    <h2>Test</h2>
                                </div>
                                {/* col 2: button */}
                                <div className={"w-1/2 text-right"}>
                                    <button className="focus:outline-none text-gray-700 hover:text-black">
                                        +
                                    </button>
                                </div>
                            </div>
                            {/* row 2: cards */}
                            <div>
                                <h2>cards</h2>
                            </div>
                        </div>
                        {/* column 2: view of notes */}
                        <div className={"bg-white h-auto w-full p-10 text-left"}>
                            <h1 className="text-2xl font-semibold">Welcome to the Dashboard</h1>
                            <p className="mt-2 text-gray-700">
                                This is a responsive layout with a toggled sidebar.
                            </p>
                            <NoteEditModal notePickId={1} setNotePickId={1}/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home