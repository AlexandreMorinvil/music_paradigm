import { ListTableEntity } from "./list-table-entity.class";

export class UsersListTableEntity extends ListTableEntity {
    constructor(user) {
        super(user);
        Object.assign(this, user);
    }

    get lastAdvanceDate() {
        return Date();
    }
}