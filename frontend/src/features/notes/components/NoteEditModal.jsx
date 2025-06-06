import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";

const NoteEditModal = (notePickId, setNotePickId) =>
{
    const [noteId, setNoteId] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteCreateDate, setNoteCreateDate] = useState("");
    const [noteUpdateDate, setNoteUpdateDate] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        (async () => await load()) ();
    }, []);

    {/* Load one note */}
    async function load() {
        const note = await axios.get("http://localhost:8080/api/notes/test");
        // setNoteUpdateDate(note.updatedAt);
        // setNoteCreateDate(note.createdAt);
        // setNoteContent(note.content);
        // setNoteTitle(note.title);
        // setNoteId(note.id);
        console.log(note.data);
    }

    {/* Save */}

    {/* Delete */}

    {/* Update */}

    return (
        <div>test upload</div>
    )
}

export default NoteEditModal;