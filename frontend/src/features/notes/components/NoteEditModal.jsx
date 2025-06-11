import React, { useState } from "react";
import axios from "axios";

import { Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import { EditingToolSnow } from '../../../components/Input/EditorToolSnow.jsx';

const NoteEditModal = ({ note, onNoteChanged }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editedContent, setEditedContent] = useState(note.content);

    async function deleteNote() {
        if (window.confirm('Are you sure you want to delete this note?')) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`http://localhost:8080/api/notes/delete/${note.id}`);
                console.log("Deleted note...");

                // trigger refresh in parent component
                setTimeout(() => {
                    onNoteChanged('deleted');
                    setIsDeleting(false);
                }, 500);
            } catch (err) {
                console.error('Error deleting note:', err);
                setIsDeleting(false);
            }
        }
    }

    async function updateNote() {
        setIsUpdating(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/notes/update/${note.id}`,
                {
                    title: note.title,
                    content: editedContent
                });
            console.log("Note Saved...");

            // trigger refresh in parent component
            setTimeout(() => {
                onNoteChanged('updated');
                setIsUpdating(false);
            }, 500);
        } catch (err) {
            console.error('Error updating note:', err);
            setIsUpdating(false);
        }
    }

    return (
        <div>
            {/* Note tools and extra information */}
            <div className="flex justify-between align-middle items-center">
                <div className="flex flex-row gap-1 items-center">
                    <p className={"text-sm text-gray-400"}>noteId: {note.id}</p>
                    <p className={"text-sm text-gray-400"}> - Updated: {note.updatedAt}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={updateNote}
                        disabled={isUpdating}
                    >
                        {isUpdating ? (
                            'Saving...'
                        ) : (
                            <FontAwesomeIcon icon={faFloppyDisk} />
                        )}
                    </button>
                    <button
                        onClick={deleteNote}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            'Deleting...'
                        ) : (
                            <FontAwesomeIcon icon={faTrash} />
                        )}
                    </button>
                </div>
            </div>


            {/* Note content section */}
            <div>
                <Typography variant="h3" color="blue-gray" className="font-light text-left pb-4">
                    {note.title}
                </Typography>

                {/* Editing tool section */}
                <div>
                    <EditingToolSnow
                        content={note.content}
                        onNoteContentChanged={setEditedContent}
                    />
                </div>
            </div>
        </div>
    )
}

export default NoteEditModal;