export class User {
    constructor(user = {}) { 
        this._id = user._id || null;

        this.createdAt = user.createdAt ? Date(user.createdAt) : null;
        this.curriculum = user.curriculum || null;
        this.group = user.group || '';
        this.isPasswordSecret = typeof user.isPasswordSecret === 'boolean' ? user.isPasswordSecret : true;
        this.lastLogin = user.lastLogin ? Date(user.lastLogin) : null;
        this.note = user.note || '';
        this.password = user.exposablePassword || user.password || '';
        this.role = user.role || 'user';
        this.tags = user.tags || [];
        this.updatedAt = user.updatedAt ? Date(user.updatedAt) : null;
        this.username = user.username || '';
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}