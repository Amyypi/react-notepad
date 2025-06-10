import React, { useEffect, useState } from 'react';
import { Note } from '../../../models/noteModel';
import axios from 'axios';

import NoteListItem from "./NoteListItem.jsx";

const NoteList = ({ onNoteSelect }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        (async () => await loadNotes()) ();
    }, []);

    async function loadNotes() {
        axios.get('http://localhost:8080/api/notes/get-all-notes')
            .then((res) => {
                const noteList = res.data.map((noteData) => new Note(noteData));
                setNotes(noteList);
            })
            .catch((err) => {
                console.error('Error fetching notes:', err);
            });
    }

    return (
        <div className={"space-y-2 pt-6"}>
            {notes.map((note) => (
                <NoteListItem key={note.id} note={note} onClick={() => onNoteSelect(note)} />
            ))}
        </div>
    )
}

export default NoteList;