import React from "react";
import { Typography } from '@material-tailwind/react';

const NoteEditModal = ({ note }) => {
    return (
        <div>
            <Typography variant="h3" color="blue-gray" className="font-light text-left pb-1">
                {note.title}
            </Typography>
            <p className="mt-2 text-gray-700">
                {note.content}
            </p>
            <div>noteId: {note.id}</div>
        </div>
    )
}

export default NoteEditModal;