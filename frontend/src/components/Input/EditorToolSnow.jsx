import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import '../../assets/styles/EditorTool.css';

Quill.register('modules/imageResize', ImageResize);

// Custom bold blot
let Inline = Quill.import('blots/inline');
class BoldBlot extends Inline {}
BoldBlot.blotName = 'bold';
BoldBlot.tagName = 'strong';
Quill.register(BoldBlot, true);

const formats = ['bold', 'italic', 'underline', 'image', 'video', 'header', 'list', 'color', 'background'];
const toolbarOptions = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'video'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
        [{
            'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466']
        }, {
            'background': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466']
        }],
    ],
    imageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar']
    }
};

export function EditingToolSnow({ onChange, note }) {
    const [editedTitle, setEditedTitle] = useState(note?.title || '');
    const [editedContent, setEditedContent] = useState(note?.content || '');

    useEffect(() => {
        setEditedTitle(note?.title || '');
        setEditedContent(note?.content || '');
    }, [note]);

    const handleTitleChange = (e) => {
        const updatedTitle = e.target.value;
        setEditedTitle(updatedTitle);
        onChange({ title: updatedTitle, content: editedContent });
    };

    const handleContentChange = (val) => {
        setEditedContent(val);
        onChange({ title: editedTitle, content: val });
    };

    return (
        <div className="note-editor-container">
            {/* 🛠️ Editor toolbar */}
            <ReactQuill
                value={''} // avoid rendering anything visible here
                onChange={() => {}}
                modules={toolbarOptions}
                formats={formats}
                className="hidden-editor"
            />

            {/* 📝 Title field */}
            <input
                className="text-3xl font-bold outline-none w-full pt-6 pl-8 pr-8"
                type="text"
                placeholder="Untitled"
                value={editedTitle}
                onChange={handleTitleChange}
            />

            {/* 📄 Content editor */}
            <ReactQuill
                value={editedContent}
                onChange={handleContentChange}
                modules={{ toolbar: false }}
                formats={formats}
                className="content-editor"
                placeholder="Start with content..."
            />
        </div>
    );
}
