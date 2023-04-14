import { ColumnType } from "./interfaces/column.interfaces"
import { ConditionOperator } from "./interfaces/filter.interfaces";

export function getConditionOperatorsByColumnType(columnType) {
    switch (columnType) {
        case ColumnType.arrayOfStrings:
            return [
                ConditionOperator.contains,
                ConditionOperator.endsWith,
                ConditionOperator.startsWith,
                ConditionOperator.isDefined,
            ];

        case ColumnType.boolean:
            return [
                ConditionOperator.isTrue,
                ConditionOperator.isDefined,
            ];

        case ColumnType.date:
            return [
                ConditionOperator.isEqual,
                ConditionOperator.isLarger,
                ConditionOperator.isSmaller,
                ConditionOperator.isLargerOrEqual,
                ConditionOperator.isSmallerOrEqual,
                ConditionOperator.isDefined,
            ];

        case ColumnType.duration:
            return [
                ConditionOperator.isEqual,
                ConditionOperator.isLarger,
                ConditionOperator.isSmaller,
                ConditionOperator.isLargerOrEqual,
                ConditionOperator.isSmallerOrEqual,
                ConditionOperator.isDefined,
            ];

        case ColumnType.number:
            return [
                ConditionOperator.isEqual,
                ConditionOperator.isLarger,
                ConditionOperator.isSmaller,
                ConditionOperator.isLargerOrEqual,
                ConditionOperator.isSmallerOrEqual,
                ConditionOperator.isDefined,
            ];

        case ColumnType.string:
            return [
                ConditionOperator.isEqual,
                ConditionOperator.isLarger,
                ConditionOperator.isSmaller,
                ConditionOperator.isLargerOrEqual,
                ConditionOperator.isSmallerOrEqual,
                ConditionOperator.contains,
                ConditionOperator.startsWith,
                ConditionOperator.endsWith,
                ConditionOperator.isDefined,
            ];
            
        default:
            return [];
    }
}