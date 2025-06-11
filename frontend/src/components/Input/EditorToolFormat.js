// CustomBoldBlot.js or within the same file
import ReactQuill, { Quill } from 'react-quill-new';

// Define and register custom Bold format
let Inline = Quill.import('blots/inline');

class BoldBlot extends Inline {}
BoldBlot.blotName = 'bold';        // custom name, can also be 'custom-bold' if needed
BoldBlot.tagName = 'strong';       // override default if needed
Quill.register(BoldBlot, true);    // register the custom format

// formats array must match the formats you're using
const formats = ['bold'];