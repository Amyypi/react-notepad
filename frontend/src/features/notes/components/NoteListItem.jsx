import React from "react";

const NoteListItem = ({note, onClick}) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded p-3 shadow hover:bg-gray-100 cursor-pointer text-left"
        >
            <h2 className="text-sm font-semibold truncate">{note.title || "Untitled"}</h2>
            <p className="text-xs text-gray-600 truncate">{note.content}</p>
        </div>
    );
}

export default NoteListItem;