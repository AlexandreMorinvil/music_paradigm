import { ListTableEntity } from "../list-table-entity.class";

export class CurrirulumsListTableEntity extends ListTableEntity {
    constructor(user) {
        super(user);
    }

    get sessionsCount() {
        const { sessionsList } = this.entity;
        return sessionsList?.length ?? null;
    }
}