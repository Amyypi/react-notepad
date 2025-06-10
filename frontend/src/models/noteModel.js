export class Note {
    constructor({ id = null, title = '', content = '', createdAt = null, updatedAt = null}) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    hasContent() {
        return this.content.trim().length > 0;
    }
}