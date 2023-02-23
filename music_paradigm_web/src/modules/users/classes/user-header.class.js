export class UserHeader {
    constructor(userHeader = {}) {
        this._id = userHeader._id || null;

        this.username = userHeader.username || '';
        this.email = userHeader.email || '';
        this.role = userHeader.role || '';
        this.tags = userHeader.tags || [];
        this.firstName = userHeader.firstName || '';
        this.middleName = userHeader.middleName || '';
        this.lastName = userHeader.lastName || '';
        this.curriculumTitle = userHeader.curriculumTitle || null;
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}