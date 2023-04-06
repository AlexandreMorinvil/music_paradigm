import { ListTableFilterCondition } from "./list-table-filter-condition.class";
import { ChainingOperator, FilterEffectType } from "../interfaces/filter.interfaces";


export class ListTableFilter {

    constructor(parameter = {}) {
        this.isActivated = parameter?.isActivated ?? true;
        this.conditionsList = parameter?.conditionsList ?? [new ListTableFilterCondition()];
        this.effectType = parameter?.effectType ?? FilterEffectType.ignore;
        this.effectColor = parameter?.effectColor ?? '#8DE8D4';
    }

    get isValid() {
        if (this.conditionsList.length === 0) return false;
        return this.conditionsList.reduce((isCumulationValid, condition) => {
            return isCumulationValid && condition.isValid();
        }, true);
    }

    get usesEffectColor() {
        return this.effectType === FilterEffectType.color;
    }

    adjustChainedConditions() {
        const firstConditionWithoutChainingIndex = this.conditionsList.findIndex((condition) => {
            return !condition.chainingOperator;
        });
        const conditionsOutOfChainingCount = (this.conditionsList.length - 1) - firstConditionWithoutChainingIndex;

        if (firstConditionWithoutChainingIndex === -1)
            this.conditionsList.push(new ListTableFilterCondition());
        else if (conditionsOutOfChainingCount !== 0)
            this.conditionsList.splice(-conditionsOutOfChainingCount);
    }

    getStringDescription() {
        if (!this.isValid) return 'INCOMPLETE FILTER';
        let stringDescription = '';
        let isOrParentesisOpened = false;
        this.conditionsList.forEach((condition) => {
            const isChainedByAnd = condition.chainingOperator === ChainingOperator.and;
            if (isChainedByAnd && !isOrParentesisOpened) {
                stringDescription += '( ';
                isOrParentesisOpened = true;
            }
            stringDescription += condition.getStringDescription();
            stringDescription += ' ';
            if (!isChainedByAnd && isOrParentesisOpened) {
                stringDescription += ') ';
                isOrParentesisOpened = false;
            }
            stringDescription += (condition.chainingOperator ?? '');
            stringDescription += isChainedByAnd ? ' ' : '\n ';
        });
        stringDescription += 'DO ';
        stringDescription += this.effectType;
        stringDescription += ' ';

        return stringDescription.trim();
    }

    getImposedColor(entity) {
        if (!this.isActivated) return null;
        if (this.effectType !== FilterEffectType.color) return null;
        return this.isAppliedTo(entity) ? this.effectColor : null;
    }

    isAppliedTo(entity) {
        if (!this.isValid) return false;
        let areChainedConditionsRespected = true;
        let previousChainingOperator = ChainingOperator.and;
        this.conditionsList.forEach(condition => {
            const isConditionRespected = condition.isRespected(entity);

            if (previousChainingOperator === ChainingOperator.and) areChainedConditionsRespected &= isConditionRespected;
            else if (previousChainingOperator === ChainingOperator.or) areChainedConditionsRespected |= isConditionRespected;

            previousChainingOperator = condition.chainingOperator;
        });
        return areChainedConditionsRespected;
    }

    setEffectType(effectType = FilterEffectType.ignore) {
        this.effectType = effectType;
    }

    setEffectColor(effectColor) {
        this.effectColor = effectColor;
    }

    shouldRemoveEntity(entity) {
        if (!this.isValid) return false;
        if (!this.isActivated) return false;
        if (![FilterEffectType.ignore, FilterEffectType.consider].includes(this.effectType)) return false;
        const isFilterApplied = this.isAppliedTo(entity);
        if (this.effectType === FilterEffectType.ignore) return isFilterApplied;
        else if (this.effectType === FilterEffectType.consider) return !isFilterApplied;
        else throw Error(`Effect type consider or ignore was expected. Got ${this.effectType}`);
    }

    toggleActivation() {
        this.isActivated = !this.isActivated;
    }
}
