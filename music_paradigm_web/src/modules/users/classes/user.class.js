export class User {
    constructor(user = {}) {
        this._id = user._id || null;

        this.username = user.username || '';
        this.password = user.password || '';
        this.isPasswordSecret = typeof user.isPasswordSecret === 'boolean' ? user.isPasswordSecret : true;
        this.role = user.role || '';
        this.tags = user.tags || [];
        this.curriculum = user.curriculum || null;
        this.lastLogin = null;
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}