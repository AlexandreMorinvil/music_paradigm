import { dateHandler, durationHandler } from '@/_helpers';

import { ColumnType } from '../../interfaces/column.interfaces';
import { ListTable } from "../list-table.class";
import { ListTableColumn } from "../list-table-column.class";
import { CurrirulumsListTableEntity } from "./curriculum-list-table-entity.class";

const possibleColumnsList = [
    new ListTableColumn({
        key: 'title',
        isAlwaysPresent: true,
        orderPriority: 1,
        title: 'Title',
        type: ColumnType.string,
    }),
    new ListTableColumn({
        key: 'progressionsInvolvedCount',
        isPresentByDefault: true,
        orderPriority: 3,
        title: 'Assignments count',
        type: ColumnType.number,
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
        key: 'isSequential',
        title: 'Do delays start after sessions',
        columnTitle: 'Delays start after sessions',
        type: ColumnType.boolean,
    }),
    new ListTableColumn({
        key: 'sessionsCount',
        isPresentByDefault: true,
        orderPriority: 2,
        title: 'Sessions count',
        type: ColumnType.number,
    }),
    new ListTableColumn({
        key: 'timeLapsedSinceCreatedAt',
        title: 'Time lapsed since creation',
        columnTitle: 'Since creation',
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

export class CurriculumsListTable extends ListTable {
    static get possibleColumnsList() {
        return possibleColumnsList;
    }

    get possibleColumnsList() {
        return possibleColumnsList;
    }

    constructor(list, parameters = {}) {
        super(list, parameters, CurrirulumsListTableEntity);
        this.title = 'Curriculums';
    }
}