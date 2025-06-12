import { useEffect, useState } from 'react'
import axios from "axios";
import { Typography } from '@material-tailwind/react';

import Header from '../../../components/Layout/Header.jsx';
import Sidebar from '../../../components/Layout/Sidebar.jsx';
import NoteList from '../../notes/components/NoteList.jsx';
import NoteEditModal from '../../../features/notes/components/NoteEditModal.jsx';
import { Note } from '../../../models/noteModel';
import '../../../assets/styles/App.css';
import Squares from '../../../components/Background/squareBackground.jsx';
import '../../../assets/styles/App.css';

function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [notes, setNotes] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/notes/get-all-notes');
            setNotes(response.data.map((noteData) => new Note(noteData)));
        } catch (err) {
            console.error('Error fetching notes:', err);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [refreshTrigger]);

    async function createNote() {
        const response = await axios.post('http://localhost:8080/api/notes/create');

        // open up the

        // Refresh the card item list
        setRefreshTrigger(prev => prev + 1);

        // Selects new created note
        setNotes(prevNotes => [response.data, ...prevNotes]);
        setSelectedNote(response.data);
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Squares />
            <div className="absolute opacity-60 top-0 z-[-1] h-screen w-screen overflow-hidden">
                <div className="h-screen w-screen left-0 top-0 absolute bg-neutral-400"></div>
                <div className="h-screen w-screen left-0 top-0 absolute bg-neutral-400"></div>
                <div className="h-screen w-screen absolute origin-top-left bg-neutral-500 opacity-80 rounded-full bg-effect-layer"></div>
            </div>


            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen}/>
            <div className="ml-0 flex flex-col h-full w-full transition-all duration-300">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
                <main className="flex-1 overflow-y-visible pt-0 pl-6 pr-0 pb-o">
                    {/* main content container */}
                    <div className="flex col-auto h-full">
                        {/* column 1: list of notes */}
                        <div
                            className="bg-white/20 backdrop-blur-md border border-white/30 shadow-md rounded-tl-3xl h-auto w-96 p-10"
                        >
                            {/* row 1: titel */}
                            <div className={"flex col-auto w-full "}>
                                {/* col 1: title */}
                                <div className={"w-1/2 text-left flex align-center"}>
                                    <Typography
                                        variant="h6"
                                        className="text-gray-500 font-light text-left pb-1 align-center content-center"
                                    >
                                        Notes
                                    </Typography>
                                </div>
                                {/* col 2: button */}
                                <div className={"w-1/2 text-right"}>
                                    <button
                                        onClick={createNote}
                                        className="bg-neutral-50 hover:bg-neutral-500 focus:outline-none border-none text-gray-700">
                                        +
                                    </button>
                                </div>
                            </div>
                            {/* row 2: cards */}
                            <div className="overflow-auto flex-grow">
                                <NoteList
                                    notes={notes}
                                    onNoteSelect={setSelectedNote}
                                />
                            </div>
                        </div>


                        {/* column 2: view of notes */}
                        <div className={"bg-white h-auto w-full text-left"}>
                            {selectedNote ? (
                                <NoteEditModal
                                    note={selectedNote}
                                    onNoteChanged={(action) => {
                                        setRefreshTrigger(prev => prev + 1);
                                        if (action === 'deleted') {
                                            setSelectedNote(null);
                                        }
                                    }}
                                />
                            ) : (
                                <p className="text-gray-500 italic p-10">Select a note to view it</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home