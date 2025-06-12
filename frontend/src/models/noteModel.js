export class Note {
    constructor({ id = null, title = '', content = '', createdAt = null, updatedAt = null}) {
        this._id = id;
        this._title = title;
        this._content = content;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    hasContent() {
        return this._content.trim().length > 0;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get content() {
        return this._content;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set id(value) {
        this._id = value;
    }

    set title(value) {
        this._title = value;
    }

    set content(value) {
        this._content = value;
    }

    set createdAt(value) {
        this._createdAt = value;
    }

    set updatedAt(value) {
        this._updatedAt = value;
    }
}