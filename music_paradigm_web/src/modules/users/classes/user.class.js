export class User {
    constructor(user = {}) {
        const parameters = JSON.parse(JSON.stringify(user ?? {}));

        this._id = parameters._id ?? null;

        this.createdAt = parameters.createdAt ?? null;
        this.curriculum = parameters.curriculum ?? null;
        this.exposablePassword = parameters.exposablePassword ?? '';
        this.group = parameters.group ?? '';
        this.isPasswordSecret = parameters.isPasswordSecret ?? true;
        this.lastLogin = parameters.lastLogin ?? null;
        this.note = parameters.note ?? '';
        this.password = parameters.password ?? null;
        this.tags = parameters.tags ?? [];
        this.updatedAt = parameters.updatedAt ?? null;
        this.username = parameters.username ?? '';
    }
}