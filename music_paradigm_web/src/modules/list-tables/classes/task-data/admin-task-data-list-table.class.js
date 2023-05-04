import { TaskDataListTable } from "./task-data-list-table.class";
import { TaskDataListTableEntity } from "./task-data-list-table-entity.class";

export class AdminTaskDataListTable extends TaskDataListTable {
    static get possibleColumnsList() {
        return TaskDataListTable.possibleColumnsList.filter((column) => {
            // Excluding the following columns
            return ![
                'username',
                'curriculumTitle',
                'associativeIdOrdinalNumber',
            ].includes(column.key);
        });
    }

    get possibleColumnsList() {
        return AdminTaskDataListTable.possibleColumnsList;
    }

    constructor(list, parameters = {}) {
        super(list, parameters, AdminTaskDataListTable);
        this.title = 'Admin Task Data';
    }
}