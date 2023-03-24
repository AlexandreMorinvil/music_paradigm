import { ListTable } from "./list-table.class";
import { ListTableColumn } from "./list-table-column.class";
import { UsersListTableEntity } from "./user-list-table-entity.class";

const possibleColumnsList = [
    new ListTableColumn({
        key: 'curriculum',
        isPresentByDefault: true,
        title: 'Curriculum',
        type: String,
    }),
    new ListTableColumn({
        key: 'group',
        isAlwaysPresent: true,
        orderPriority: 1,
        title: 'Group',
        type: String,
    }),
    new ListTableColumn({
        key: 'lastAdvanceDate',
        title: 'Date Last Advance',
        type: String,
    }),
    new ListTableColumn({
        key: 'progressionDuration',
        title: 'Duration Start to Last Advance',
    }),
    new ListTableColumn({
        key: 'tags',
        isPresentByDefault: true,
        title: 'Tags',
        type: Array,
        formatFunction: (list) => list.join('\n'),
    }),
    new ListTableColumn({
        key: 'reachedSessionTitle',
        title: 'Title reached session',
        type: String,
    }),
    new ListTableColumn({
        key: 'username',
        isAlwaysPresent: true,
        orderPriority: 2,
        title: 'Username',
        type: String,
    }),
]

export class UsersListTable extends ListTable {
    static get possibleColumnsList() {
        return possibleColumnsList;
    }

    get possibleColumnsList() {
        return possibleColumnsList;
    }

    constructor(list, parameters = {}) {
        super(list, UsersListTableEntity, parameters);
    }
}