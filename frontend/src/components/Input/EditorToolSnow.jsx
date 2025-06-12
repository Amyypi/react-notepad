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
const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'video'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
        [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] },
            { 'background': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }],
    ],
    imageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar']
    }
};

export function EditingToolSnow({ title, content, onChange }) {
    const [editorHtml, setEditorHtml] = useState(`<h1>${title}</h1><p>${content}</p>`);
    const [isInternalUpdate, setIsInternalUpdate] = useState(false);

    // Create properly formatted HTML without extra spaces
    const createEditorHtml = (titleText, contentText) => {
        const titleHtml = titleText ? `<h1>${titleText}</h1>` : '<h1>Enter Title</h1>';
        const contentHtml = contentText || '<p>Enter Content</p>';
        return titleHtml + contentHtml;
    };

    // Update editor when props change (but not when we're internally updating)
    useEffect(() => {
        if (!isInternalUpdate) {
            setEditorHtml(createEditorHtml(title, content));
        }
        setIsInternalUpdate(false);
    }, [title, content, isInternalUpdate]);

    // Initialize on mount
    useEffect(() => {
        setEditorHtml(createEditorHtml(title, content));
    }, []);

    const handleChange = (value) => {
        setEditorHtml(value);
        setIsInternalUpdate(true);

        // Extract <h1> and remaining content more carefully
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = value;

        const h1Element = tempDiv.querySelector('h1');
        const extractedTitle = h1Element?.textContent?.trim() || '';

        // Remove the h1 element
        if (h1Element) {
            h1Element.remove();
        }

        // Get remaining content and clean it up
        let extractedContent = tempDiv.innerHTML.trim();

        // If content is empty or just whitespace, set to empty string
        if (!extractedContent || extractedContent === '<p><br></p>' || extractedContent === '<p></p>') {
            extractedContent = '';
        }

        onChange({ title: extractedTitle, content: extractedContent });
    };

    return (
        <div className="flex flex-col gap-4">
            <ReactQuill
                value={editorHtml}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                placeholder="Start with a title..."
                theme="snow"
            />
        </div>
    );
}