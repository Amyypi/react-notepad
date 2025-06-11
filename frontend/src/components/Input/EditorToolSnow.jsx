import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

// Custom bold blot
let Inline = Quill.import('blots/inline');
class BoldBlot extends Inline {}
BoldBlot.blotName = 'bold';
BoldBlot.tagName = 'strong';
Quill.register(BoldBlot, true);

const formats = ['bold', 'italic', 'underline', 'image', 'video', 'header', 'list'];
const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'video'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean']
    ],
    imageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar']
    }
};

export function EditingToolSnow({ content, onNoteContentChanged }) {
    const [text, setText] = useState(content);

    // Update editor when prop changes
    useEffect(() => {
        setText(content);
    }, [content]);

    function handleEditorChange(value) {
        setText(value);
        onNoteContentChanged(value);
    }

    return (
        <ReactQuill
            theme="snow"
            value={text}
            onChange={handleEditorChange}
            placeholder="Write your note here..."
            modules={modules}
            formats={formats}
        />
    );
}