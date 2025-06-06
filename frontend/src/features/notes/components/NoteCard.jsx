import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";

const Note = () =>
{
    const [noteId, setNoteId] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteCreateDate, setNoteCreateDate] = useState("");
    const [noteUpdateDate, setNoteUpdateDate] = useState("");

    useEffect(() => {
        (async () => await Load()) ();
    }, []);

    {/* Load */}

}