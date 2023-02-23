export class UserHeader {
    constructor(userHeader = {}) {
        this._id = userHeader._id || null;

        this.username = userHeader.username || '';
        this.tags = userHeader.tags || [];
        this.curriculumTitle = userHeader.curriculumTitle || null;
        this.lastLogin = null;
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}