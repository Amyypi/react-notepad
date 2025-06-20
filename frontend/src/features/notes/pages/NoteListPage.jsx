import { useEffect, useState } from 'react'
import axios from "axios";
import { Typography } from '@material-tailwind/react';

import Header from '../../../components/Layout/Header.jsx';
import Sidebar from '../../../components/Layout/Sidebar.jsx';
import NoteList from '../../notes/components/NoteList.jsx';
import NoteEditModal from '../../../features/notes/components/NoteEditModal.jsx';
import { Note } from '../../../models/noteModel';
import Squares from '../../../components/Background/squareBackground.jsx';

import '../../../assets/styles/App.css';
import '../../../assets/styles/global.css';

function NoteListPage() {
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
                <main className="flex-1 overflow-hidden pt-0 pl-6 pr-0 pb-0">
                    {/* main content container */}
                    <div className="flex h-full">
                        {/* column 1: list of notes */}
                        <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-md rounded-tl-3xl h-full w-96 flex flex-col">
                            {/* row 1: title and button - fixed height */}
                            <div className="flex justify-between items-center p-6 pb-4 flex-shrink-0">
                                <Typography
                                    variant="h6"
                                    className="text-gray-500 font-light"
                                >
                                    Notes
                                </Typography>
                                <button
                                    onClick={createNote}
                                    className="primary-button focus:outline-none border-none w-8 h-8 rounded flex items-center justify-center transition-colors duration-200"
                                >
                                    +
                                </button>
                            </div>
                            {/* row 2: scrollable notes list */}
                            <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
                                <NoteList
                                    notes={notes}
                                    onNoteSelect={setSelectedNote}
                                />
                            </div>
                        </div>

                        {/* column 2: view of notes */}
                        <div className="bg-white h-full flex-1">
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

export default NoteListPage