import { ChainingOperator, ConditionOperator } from "../interfaces/filter.interfaces";

export class ListTableFilterCondition {
    constructor(parameter = {}) {
        this.columnKey = parameter?.columnKey ?? null;
        this.operatorNegator = parameter?.operatorNegator ?? false;
        this.operator = parameter?.operator ?? ConditionOperator.isEqual;
        this.comparativeValue = parameter?.comparativeValue ?? null;
        this.chainingOperator = parameter?.chainingOperator ?? null;
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

    editColumn(columnKey) {
        this.conditionsList.columnKey = columnKey;
    }

    isRespected(entity) {
        const value = entity.getValueByColumnKey(this.columnKey);
        if (value === null || value === undefined || value === '') return false;
        else return this.applyCondition(value);
    }

    getStringDescription() {
        return 'Value ' +
            this.operatorNegator ? 'NOT ' : '' +
            `${this.operator} ` +
            `${this.comparativeValue} ` +
            this.chainingOperator ?? '';
    }

    setChainingOperator(chainingOperator) {
        this.chainingOperator = chainingOperator;
    }

    setColumnKey(columnKey) {
        this.columnKey = columnKey;
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
        return String(valueToConsider  ?? '').endsWith(String(this.comparativeValue));
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