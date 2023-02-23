export class User {
    constructor(user = {}) {
        this._id = user._id || null;

        this.username = user.username || '';
        this.email = user.email || '';
        this.role = user.role || '';
        this.tags = user.tags || [];
        this.firstName = user.firstName || '';
        this.middleName = user.middleName || '';
        this.lastName = user.lastName || '';
        this.curriculum = user.curriculum || null;
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}