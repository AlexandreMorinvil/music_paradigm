export class UserHeader {
    constructor(userHeader = {}) {
        this._id = userHeader._id || null;

        this.curriculumTitle = userHeader.curriculumTitle || null;
        this.group = user.group || '';
        this.lastLogin = null;
        this.tags = userHeader.tags || [];
        this.username = userHeader.username || '';
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}