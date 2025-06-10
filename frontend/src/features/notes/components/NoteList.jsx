import React from 'react';
import NoteListItem from "./NoteListItem.jsx";

const NoteList = ({ notes, onNoteSelect }) => {
    return (
        <div className={"space-y-2 pt-6"}>
            {notes.map((note) => (
                <NoteListItem key={note.id} note={note} onClick={() => onNoteSelect(note)} />
            ))}
        </div>
    )
}

export default NoteList;