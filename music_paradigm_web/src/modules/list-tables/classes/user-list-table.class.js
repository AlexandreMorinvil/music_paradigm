import { dateHandler, durationHandler } from '@/_helpers';

import { ColumnType } from '../interfaces/column.interfaces';
import { ListTable } from "./list-table.class";
import { ListTableColumn } from "./list-table-column.class";
import { UsersListTableEntity } from "./user-list-table-entity.class";

const possibleColumnsList = [
    new ListTableColumn({
        key: 'group',
        isAlwaysPresent: true,
        orderPriority: 1,
        title: 'Group',
        type: ColumnType.string,
    }),
    new ListTableColumn({
        key: 'username',
        isAlwaysPresent: true,
        orderPriority: 2,
        title: 'Username',
        type: ColumnType.string,
    }),
    new ListTableColumn({
        key: 'progressionCompletedSessionsCount',
        keyForDisplay: 'progressionCompletedSessionsFraction',
        title: 'Completed sessions count',
        columnTitle: 'Completed sessions',
        type: ColumnType.number,
        formatFunction: ([completed, total]) => { return `${completed}/${total}` },
    }),
    new ListTableColumn({
        key: 'curriculumTitle',
        isPresentByDefault: true,
        title: 'Curriculum',
        type: ColumnType.string,
    }),
    new ListTableColumn({
        key: 'createdAt',
        title: 'Date of creation',
        columnTitle: 'Creation date',
        type: ColumnType.date,
        formatFunction: dateHandler.formatDateYearToMinutes,
    }),
    new ListTableColumn({
        key: 'progressionLastAdvancedDate',
        title: 'Date of last advance in curriculum',
        type: ColumnType.date,
        formatFunction: dateHandler.formatDateYearToMinutes,
    }),
    new ListTableColumn({
        key: 'lastLogin',
        title: 'Date of last login',
        columnTitle: 'Last login date',
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
        key: 'progressionStartDate',
        title: 'Date of start of curriculum',
        columnTitle: 'Start Date',
        type: ColumnType.date,
        formatFunction: dateHandler.formatDateYearToMinutes,
    }),
    new ListTableColumn({
        key: 'progressionDuration',
        title: 'Duration of curriculum progression',
        columnTitle: 'Progress duration',
        type: ColumnType.duration,
        formatFunction: (value) => durationHandler.formatDurationWeekToSecondsFromLargerUnit(value, 2),
    }),
    new ListTableColumn({
        key: 'hasNote',
        title: 'Has note',
        type: ColumnType.boolean,
    }),
    new ListTableColumn({
        key: 'isAdvanceResultOfConsiderCompletedAdjustmentSessions',
        title: 'Has skipped session by adjustment',
        columnTitle: 'Skip session adjustment',
        type: ColumnType.boolean,
    }),
    new ListTableColumn({
        key: 'isProgressionBlocked',
        title: 'Is progression blocked by adjustment',
        columnTitle: 'Is blocked',
        type: ColumnType.boolean,
    }),
    new ListTableColumn({
        key: 'tags',
        isPresentByDefault: true,
        title: 'Tags',
        type: ColumnType.arrayOfStrings,
        formatFunction: (list) => list.join(',\n'),
    }),
    new ListTableColumn({
        key: 'timeLapsedSinceCreatedAt',
        title: 'Time lapsed since creation',
        columnTitle: 'Since creation',
        type: ColumnType.duration,
        formatFunction: (value) => durationHandler.formatDurationWeekToSecondsFromLargerUnit(value, 2),
    }),
    new ListTableColumn({
        key: 'progressionLastAdvancedTime',
        title: 'Time lapsed since last advance in curriculum',
        columnTitle: 'Since last advance',
        type: ColumnType.duration,
        formatFunction: (value) => durationHandler.formatDurationWeekToSecondsFromLargerUnit(value, 2),
    }),
    new ListTableColumn({
        key: 'timeLapsedSinceLastLogin',
        title: 'Time lapsed since last login',
        columnTitle: 'Since last login',
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
    new ListTableColumn({
        key: 'progressionStartTime',
        title: 'Time lapsed since start of curriculum',
        columnTitle: 'Since start',
        type: ColumnType.duration,
        formatFunction: (value) => durationHandler.formatDurationWeekToSecondsFromLargerUnit(value, 2),
    }),
    new ListTableColumn({
        key: 'reachedSessionTitle',
        title: 'Title reached session',
        columnTitle: 'Reached session',
        type: ColumnType.string,
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
        super(list, parameters, UsersListTableEntity);
        this.title = 'Users';
    }
}