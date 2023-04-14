import { getConditionOperatorsByColumnType } from '../get-condition-operators-by-column-type';
import { ColumnType } from '../interfaces/column.interfaces';
import { ConditionOperator } from "../interfaces/filter.interfaces";
import { ListTableColumn } from './list-table-column.class';
import { formatDefaultByColumnType } from '../format-default-by-column-type';

export class ListTableFilterCondition {
    constructor(parameter = {}) {
        this.column = parameter?.column ?? new ListTableColumn();
        this.operatorNegator = parameter?.operatorNegator ?? false;
        this.operator = parameter?.operator ?? null;
        this.comparativeValue = parameter?.comparativeValue ?? null;
        this.chainingOperator = parameter?.chainingOperator ?? null;
    }

    get columnKey() {
        return this.column.key ?? null;
    }

    get columnTitle() {
        return this.column.title ?? this.column.columnTitle ?? this.columnKey;
    }

    get columnType() {
        return this.column.type ?? null;
    }

    get formattedComparativeValue() {
        return formatDefaultByColumnType(this.comparativeValue, this.columnType);
    }

    get usesComparativeValue() {
        return ![
            null,
            ConditionOperator.isTrue,
            ConditionOperator.isDefined,
        ].includes(this.operator);
    }

    applyCondition(value) {
        switch (this.operator) {
            case ConditionOperator.isEqual: return this.__isEqual(value);
            case ConditionOperator.isSmaller: return this.__isSmaller(value);
            case ConditionOperator.isLarger: return this.__isLarger(value);
            case ConditionOperator.isLargerOrEqual: return this.__isLargerOrEqual(value);
            case ConditionOperator.isSmallerOrEqual: return this.__isSmallerOrEqual(value);
            case ConditionOperator.startsWith: return this.__startsWith(value);
            case ConditionOperator.endsWith: return this.__endsWith(value);
            case ConditionOperator.contains: return this.__contains(value);
            case ConditionOperator.isTrue: return this.__isTrue(value);
            case ConditionOperator.isDefined: return this.__isDefined(value);
            default: return false;
        }
    }

    getStringDescription() {
        const stringDescription = `"${this.columnTitle}" ` +
            (this.operatorNegator ? 'IS NOT ' : 'IS ') +
            `${this.operator} ` +
            (this.usesComparativeValue ? `"${this.formattedComparativeValue}" ` : '');
        return stringDescription.trim();
    }

    isRespected(entity) {
        const value = entity.getValueByColumnKey(this.columnKey);
        const isConditionApplied = this.applyCondition(value);
        return this.operatorNegator ? !isConditionApplied : isConditionApplied;
    }

    isValid() {
        const isColumnKeyDefined = Boolean(this.columnKey);
        const isComparativeValueValid = this.usesComparativeValue ? Boolean(this.comparativeValue) : true;
        return isColumnKeyDefined && isComparativeValueValid;
    }

    setChainingOperator(chainingOperator) {
        this.chainingOperator = chainingOperator;
    }

    setColumn(column) {
        const oldType = this.columnType, newType = column.type;
        this.column = column;

        if (oldType === newType) return
        this.forceValidComparativeValue();
        this.forceValidOperator();
    }

    setComparativeValue(comparativeValue) {
        this.comparativeValue = comparativeValue;
    }

    setOperatorNegator(operatorNegator) {
        this.operatorNegator = operatorNegator;
    }

    setOperator(operator) {
        this.operator = operator;
    }

    forceValidOperator() {
        const allowedConditionOperatorsList = getConditionOperatorsByColumnType(this.columnType);
        const isOperatorAllowedForNewColumn = allowedConditionOperatorsList.includes(this.operator);
        if (!isOperatorAllowedForNewColumn) this.setOperator(allowedConditionOperatorsList[0]);
    }

    forceValidComparativeValue() {
        if ([ColumnType.boolean].includes(this.columnType)) this.setComparativeValue(true);
        else if ([ColumnType.date].includes(this.columnType)) this.setComparativeValue(new Date());
        else if ([ColumnType.duration].includes(this.columnType)) this.setComparativeValue(0);
        else if ([ColumnType.number].includes(this.columnType)) this.setComparativeValue(0);
        else if ([ColumnType.string, ColumnType.arrayOfStrings].includes(this.columnType)) this.setComparativeValue('');
        else this.setComparativeValue(null);
    }

    __isEqual(value) {
        return value == this.comparativeValue;
    }

    __isSmaller(value) {
        return value < this.comparativeValue;
    }

    __isLarger(value) {
        return value > this.comparativeValue;
    }

    __isLargerOrEqual(value) {
        return value >= this.comparativeValue;
    }

    __isSmallerOrEqual(value) {
        return value <= this.comparativeValue;
    }

    __startsWith(value) {
        const valueToConsider = Array.isArray(value) ? value[0] : value;
        return String(valueToConsider ?? '').startsWith(String(this.comparativeValue));
    }

    __endsWith(value) {
        const valueToConsider = Array.isArray(value) ? value[value.length] : value;
        return String(valueToConsider ?? '').endsWith(String(this.comparativeValue));
    }

    __contains(value) {
        return String(value).includes(String(this.comparativeValue));
    }

    __isTrue(value) {
        return Boolean(value);
    }

    __isDefined(value) {
        return !(value === null || value === undefined || value === '');
    }
}