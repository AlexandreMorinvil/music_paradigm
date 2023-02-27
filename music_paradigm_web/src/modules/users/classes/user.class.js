export class User {
    constructor(user = {}) {
        this._id = user._id || null;

        this.curriculum = user.curriculum || null;
        this.group = user.group || '';
        this.isPasswordSecret = typeof user.isPasswordSecret === 'boolean' ? user.isPasswordSecret : true;
        this.lastLogin = null;
        this.note = user.note || '';
        this.password = user.password || '';
        this.role = user.role || '';
        this.tags = user.tags || [];
        this.username = user.username || '';
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}