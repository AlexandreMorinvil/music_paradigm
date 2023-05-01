import { ListTableEntity } from "../list-table-entity.class";

export class TaskDataListTableEntity extends ListTableEntity {
    constructor(user) {
        super(user);
    }

    get taskFullName() {
        const { taskGroup, taskName, taskVersion } = this.entity;
        return `${taskGroup}/${taskName}/[v]${taskVersion}`;
    }
}