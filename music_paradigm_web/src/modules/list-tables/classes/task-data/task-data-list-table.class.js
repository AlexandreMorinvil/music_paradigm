import { dateHandler, durationHandler } from '@/_helpers';

import { ColumnType } from '../../interfaces/column.interfaces';
import { ListTable } from "../list-table.class";
import { ListTableColumn } from "../list-table-column.class";
import { TaskDataListTableEntity } from "./task-data-list-table-entity.class";

const possibleColumnsList = [
    new ListTableColumn({
        key: 'username',
        isPresentByDefault: true,
        orderPriority: 1,
        title: 'Username',
        type: ColumnType.string,
    }),
    new ListTableColumn({
        key: 'curriculumTitle',
        isPresentByDefault: true,
        orderPriority: 2,
        title: 'Curriculum',
        type: ColumnType.string,
    }),
    new ListTableColumn({
        key: 'completionDate',
        title: 'Date of completion',
        columnTitle: 'Completion date',
        type: ColumnType.date,
        formatFunction: dateHandler.formatDateYearToMinutes,
    }),
    new ListTableColumn({
        key: 'createdAt',
        title: 'Date of creation',
        columnTitle: 'Creation date',
        type: ColumnType.date,
        formatFunction: dateHandler.formatDateYearToMinutes,
    }),
    new ListTableColumn({
        key: 'updatedAt',
        title: 'Date of last update',
        columnTitle: 'Last update date',
        type: ColumnType.date,
        formatFunction: dateHandler.formatDateYearToMinutes,
    }),
    new ListTableColumn({
        key: 'firstStartDate',
        title: 'Date of start',
        columnTitle: 'Start date',
        type: ColumnType.date,
        formatFunction: dateHandler.formatDateYearToMinutes,
    }),
    new ListTableColumn({
        key: 'logTags',
        isPresentByDefault: true,
        title: 'Tags',
        type: ColumnType.arrayOfStrings,
        formatFunction: (list) => list.join(',\n'),
    }),
    new ListTableColumn({
        key: 'associativeId',
        isPresentByDefault: true,
        orderPriority: 3,
        title: 'Session ID (Associative ID)',
        columnTitle: 'Session ID',
        type: ColumnType.string,
    }),
    new ListTableColumn({
        key: 'associativeIdOrdinalNumber',
        isPresentByDefault: true,
        orderPriority: 4,
        title: 'Session ID ordinal number',
        columnTitle: 'Session ID ord. num.',
        type: ColumnType.number,
    }),
    new ListTableColumn({
        key: 'taskFullName',
        isPresentByDefault: true,
        orderPriority: 5,
        title: 'Task full name',
        type: ColumnType.string,
    }),
    new ListTableColumn({
        key: 'taskGroup',
        title: 'Task group',
        type: ColumnType.string,
    }),
    new ListTableColumn({
        key: 'taskName',
        title: 'Task name',
        type: ColumnType.string,
    }),
    new ListTableColumn({
        key: 'taskVersion',
        title: 'Task version',
        type: ColumnType.string,
    }),
    new ListTableColumn({
        key: 'timeLapsedSinceCompletionDate',
        title: 'Time lapsed since completion date',
        columnTitle: 'Since completion',
        type: ColumnType.duration,
        formatFunction: (value) => durationHandler.formatDurationWeekToSecondsFromLargerUnit(value, 2),
    }),
    new ListTableColumn({
        key: 'timeLapsedSinceCreatedAt',
        title: 'Time lapsed since creation',
        columnTitle: 'Since creation',
        isPresentByDefault: true,
        orderPriority: 6,
        type: ColumnType.duration,
        formatFunction: (value) => durationHandler.formatDurationWeekToSecondsFromLargerUnit(value, 2),
    }),
    new ListTableColumn({
        key: 'timeLapsedSinceFirstStartDate',
        title: 'Time lapsed since first start date',
        columnTitle: 'Since start',
        type: ColumnType.duration,
        formatFunction: (value) => durationHandler.formatDurationWeekToSecondsFromLargerUnit(value, 2),
    }),
    new ListTableColumn({
        key: 'timeLapsedSinceUpdatedAt',
        title: 'Time lapsed since last update',
        columnTitle: 'Since update',
        type: ColumnType.duration,
        formatFunction: (value) => durationHandler.formatDurationWeekToSecondsFromLargerUnit(value, 2),
    }),
]

export class TaskDataListTable extends ListTable {
    static get possibleColumnsList() {
        return possibleColumnsList;
    }

    get possibleColumnsList() {
        return possibleColumnsList;
    }

    constructor(list, parameters = {}) {
        super(list, parameters, TaskDataListTableEntity);
        this.title = 'Task Data';
    }
}