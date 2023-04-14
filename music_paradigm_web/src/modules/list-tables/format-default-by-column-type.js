import { dateHandler, durationHandler } from '@/_helpers';

import { ColumnType } from "./interfaces/column.interfaces"

export function formatDefaultByColumnType(value, columnType) {
    switch (columnType) {
        case ColumnType.date:
            return dateHandler.formatDateYearToMinutes(value);
        case ColumnType.duration:
            return durationHandler.formatDurationWeekToSecondsFromLargerUnit(value, 2);
        default: return value;
    }
}