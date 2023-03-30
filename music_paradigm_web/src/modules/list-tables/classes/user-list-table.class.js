import { dateHandler, durationHandler } from '@/_helpers';

import { ListTable } from "./list-table.class";
import { ListTableColumn } from "./list-table-column.class";
import { UsersListTableEntity } from "./user-list-table-entity.class";

const possibleColumnsList = [
    new ListTableColumn({
        key: 'group',
        isAlwaysPresent: true,
        orderPriority: 1,
        title: 'Group',
        type: String,
    }),
    new ListTableColumn({
        key: 'username',
        isAlwaysPresent: true,
        orderPriority: 2,
        title: 'Username',
        type: String,
    }),
    new ListTableColumn({
        key: 'progressionCompletedSessionsFraction',
        title: 'Completed sessions count',
        columnTitle: 'Completed sessions',
        type: Number,
        formatFunction: ([completed, total]) => { return `${completed}/${total}` },
    }),
    new ListTableColumn({
        key: 'curriculumTitle',
        isPresentByDefault: true,
        title: 'Curriculum',
        type: String,
    }),
    new ListTableColumn({
        key: 'createdAt',
        title: 'Date of creation',
        columnTitle: 'Creation date',
        type: Date,
        formatFunction: dateHandler.formatDateYearToMinutes,
    }),
    new ListTableColumn({
        key: 'progressionLastAdvancedDate',
        title: 'Date of last advance',
        type: String,
        formatFunction: dateHandler.formatDateYearToMinutes,
    }),
    new ListTableColumn({
        key: 'lastLogin',
        title: 'Date of last login',
        columnTitle: 'Last login date',
        type: Date,
        formatFunction: dateHandler.formatDateYearToMinutes,
    }),
    new ListTableColumn({
        key: 'updatedAt',
        title: 'Date of last update',
        columnTitle: 'Last update date',
        type: Date,
        formatFunction: dateHandler.formatDateYearToMinutes,
    }),
    new ListTableColumn({
        key: 'progressionDuration',
        title: 'Duration of progress',
        columnTitle: 'Progress duration',
        type: Number,
        formatFunction: durationHandler.formatDurationWeekToSecondsFromLargerUnit,
    }),
    new ListTableColumn({
        key: 'isAdvanceResultOfConsiderCompletedAdjustmentSessions',
        title: 'Has skipped session by adjustment',
        columnTitle: 'Skip session adjustment',
        type: Boolean,
    }),
    new ListTableColumn({
        key: 'isProgressionBlocked',
        title: 'Is progression blocked by adjustment',
        columnTitle: 'Is blocked',
        type: Boolean,
    }),
    new ListTableColumn({
        key: 'tags',
        isPresentByDefault: true,
        title: 'Tags',
        type: Array,
        formatFunction: (list) => list.join('\n'),
    }),
    new ListTableColumn({
        key: 'progressionLastAdvancedTime',
        title: 'Time lapsed since last advance',
        columnTitle: 'Since last advance',
        type: Number,
        formatFunction: durationHandler.formatDurationWeekToSecondsFromLargerUnit,
    }),
    new ListTableColumn({
        key: 'progressionStartTime',
        title: 'Time lapsed since start',
        columnTitle: 'Since start',
        type: Number,
        formatFunction: durationHandler.formatDurationWeekToSecondsFromLargerUnit,
    }),
    new ListTableColumn({
        key: 'reachedSessionTitle',
        title: 'Title reached session',
        columnTitle: 'Reached session',
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
        this.title = 'Users';
    }
}