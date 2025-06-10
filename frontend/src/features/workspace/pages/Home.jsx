import { useEffect, useState } from 'react'
import axios from "axios";
import { Typography } from '@material-tailwind/react';

import Header from '../../../components/Layout/Header.jsx'
import Sidebar from '../../../components/Layout/Sidebar.jsx'
import NoteList from '../../notes/components/NoteList.jsx';
import NoteListItem from '../../notes/components/NoteListItem.jsx';
import NoteEditModal from '../../../features/notes/components/NoteEditModal.jsx'
import { Note } from '../../../models/noteModel';
import '../../../assets/styles/App.css'

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
        console.log("createNote");
        const response = await axios.post('http://localhost:8080/api/notes/create');

        // Refresh the card item list
        setRefreshTrigger(prev => prev + 1);

        // Selects new created note
        setNotes(prevNotes => [response.data, ...prevNotes]);
        setSelectedNote(response.data);
    }

    return (
        <div className="relative h-screen w-screen bg-gray-400">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="ml-0 flex flex-col h-full transition-all duration-300">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-y-visible pt-0 pl-6 pr-0 pb-o">
                    {/* main content container */}
                    <div className="flex col-auto h-full">
                        {/* column 1: list of notes */}
                        <div className={"bg-gray-200 h-auto w-96 rounded-tl-3xl p-10"}>
                            {/* row 1: titel */}
                            <div className={"flex col-auto w-full "}>
                                {/* col 1: title */}
                                <div className={"w-1/2 text-left flex align-center"}>
                                    <Typography
                                        variant="h2"
                                        color="blue-gray"
                                        className="font-light text-left pb-1 align-center content-center"
                                    >
                                        Notes
                                    </Typography>
                                </div>
                                {/* col 2: button */}
                                <div className={"w-1/2 text-right"}>
                                    <button
                                        onClick={createNote}
                                        className="focus:outline-none text-gray-700 hover:text-black">
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
                        <div className={"bg-white h-auto w-full p-10 text-left"}>
                            {selectedNote ? (
                                <NoteEditModal note={selectedNote}/>
                            ) : (
                                <p className="text-gray-500 italic">Select a note to view it</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home