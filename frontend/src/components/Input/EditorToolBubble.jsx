import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../../assets/styles/EditorTool.css'

// Register custom formats before rendering Quill
let Inline = Quill.import('blots/inline');
class BoldBlot extends Inline {}
BoldBlot.blotName = 'bold';
BoldBlot.tagName = 'strong';
Quill.register(BoldBlot, true);

// Toolbar options
const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    ['image', 'video'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean']
];

const formats = [
    'bold', 'italic', 'underline',
    'image', 'video',
    'header', 'list', 'bullet'
];

export function EditingToolSnow({ content }) {
    const [text, setText] = useState(content);

    return (
        <div>
            <ReactQuill
                theme="bubble"
                value={text}
                onChange={setText}
                placeholder="Write your note here..."
                modules={{ toolbar: toolbarOptions }}
                formats={formats}
            />
        </div>
    );
}