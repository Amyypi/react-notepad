export class Note {
    constructor({ id = null, title = '', content = '', tags = [] } = {}) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.tags = tags;
    }

    hasContent() {
        return this.content.trim().length > 0;
    }
}