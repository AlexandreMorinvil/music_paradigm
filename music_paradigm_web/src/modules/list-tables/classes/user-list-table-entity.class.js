import { ListTableEntity } from "./list-table-entity.class";

export class UsersListTableEntity extends ListTableEntity {
    constructor(user) {
        super(user);
    }

    get curriculum() {
        return this.entity.curriculumTitle;
    }
}