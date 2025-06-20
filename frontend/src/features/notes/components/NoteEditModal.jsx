import React, {useEffect, useState} from "react";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import { EditingToolSnow } from '../../../components/Input/EditorToolSnow.jsx';

const NoteEditModal = ({ note, onNoteChanged }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editedNote, setEditedNote] = useState({...note});

    useEffect(() => {
        setEditedNote({...note});
    }, [note]);

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
            const id = note.id;

            if (id != null) {
                const response = await axios.put(`http://localhost:8080/api/notes/update/` + id,
                    {
                        title: editedNote.title,
                        content: editedNote.content
                    });
                console.log("Note Saved...");
            } else {
                const response = await axios.post(`http://localhost:8080/api/notes/create`,
                    {
                        title: editedNote.title,
                        content: editedNote.content
                    }
                )
            }

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
        <div className="h-full flex flex-col">
            <div className="flex justify-between align-middle items-center p-10 pb-5 flex-shrink-0">
                <div className="flex flex-row gap-1 items-center">
                    <p className={"text-sm text-gray-400"}>noteId: {note.id}</p>
                    <p className={"text-sm text-gray-400"}> - Updated: {note.updatedAt}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="px-4 py-3 text-sm primary-button rounded border-none text-gray-700"
                    >
                        {true ? 'Show Editor' : 'Show HTML'}
                    </button>
                    <button
                        onClick={updateNote}
                        disabled={isUpdating}
                        className="px-4 py-3 text-sm primary-button rounded border-none text-gray-700"
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
                        className="px-4 py-3 text-sm primary-button rounded border-none text-gray-700"
                    >
                        {isDeleting ? (
                            'Deleting...'
                        ) : (
                            <FontAwesomeIcon icon={faTrash} />
                        )}
                    </button>
                </div>
            </div>
            <EditingToolSnow
                title={note.title}
                content={note.content}
                onChange={(data) => {
                    setEditedNote(prev => ({
                        ...prev,
                        title: data.title,
                        content: data.content
                    }));
                }}
            />
        </div>
    )
}

export default NoteEditModal;