import React, { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
import '../../assets/styles/EditorTool.css';

Quill.register('modules/imageResize', ImageResize);

const formats = ['bold', 'italic', 'underline', 'image', 'video', 'header', 'list', 'color', 'background'];

export function EditingToolSnow({ title, content, onChange }) {
    const quillRef = useRef(null);
    const toolbarRef = useRef(null);
    const [editorContent, setEditorContent] = useState(content);
    const [editorTitle, setEditorTitle] = useState(title);

    const modules = {
        toolbar: {
            container: toolbarRef.current,
        },
        imageResize: {
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
        },
    };

    // Ensure toolbar container is set *after* the ref exists
    useEffect(() => {
        if (quillRef.current && toolbarRef.current) {
            const editor = quillRef.current.getEditor();
            const toolbar = editor.getModule('toolbar');
            if (toolbar) {
                toolbar.container = toolbarRef.current;
            }
        }
    }, []);

    // Sync external props
    useEffect(() => {
        setEditorContent(content || '');
        setEditorTitle(title || '');
    }, [title, content]);

    const handleEditorChange = (value) => {
        setEditorContent(value);
        onChange({ title: editorTitle, content: value });
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setEditorTitle(newTitle);
        onChange({ title: newTitle, content: editorContent });
    };

    return (
        <div className="note-editor-container flex-1 overflow-hidden flex flex-col">
            {/* Fixed Toolbar - doesn't scroll */}
            <div ref={toolbarRef} className="quill-custom-toolbar text-left px-4 pt-4 flex-shrink-0">
            <span className="ql-formats">
                <select className="ql-header" defaultValue="">
                    <option value="1" />
                    <option value="2" />
                    <option value="" />
                </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
            </span>
                <span className="ql-formats">
                <button className="ql-image" />
                <button className="ql-video" />
            </span>
                <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
            </span>
                <span className="ql-formats">
                <select className="ql-color" />
                <select className="ql-background" />
            </span>
                <span className="ql-formats">
                <button className="ql-clean" />
            </span>
            </div>

            {/* Scrollable Content Area - title and editor */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <input
                    type="text"
                    placeholder="Untitled"
                    value={editorTitle}
                    onChange={handleTitleChange}
                    className="text-3xl font-bold outline-none w-full pb-4 pt-6 px-8"
                />
                <ReactQuill
                    ref={quillRef}
                    value={editorContent}
                    onChange={handleEditorChange}
                    modules={modules}
                    formats={formats}
                    placeholder="Start with content..."
                    className="content-editor pb-8"
                />
            </div>
        </div>
    );
}