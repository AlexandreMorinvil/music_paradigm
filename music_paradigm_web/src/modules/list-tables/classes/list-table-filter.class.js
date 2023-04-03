import { ListTableFilterCondition } from "./list-table-filter-condition.class";
import { ChainingOperator, FilterEffectType } from "../interfaces/filter.interfaces";


export class ListTableFilter {

    constructor(parameter = {}) {
        this.conditionsList = parameter?.conditionsList ?? [new ListTableFilterCondition()];
        this.effectType = parameter?.effectType ?? FilterEffectType.ignore;
        this.effectParameter = parameter?.effectParameter ?? null;
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

    editColumn(index, columnKey) {
        this.conditionsList[index].editColumn(columnKey);
    }

    getConditionsDescription() {
        return this.conditionsList.map(condition => condition.getStringDescription()).join('\n');
    }

    getImposedColor(entity) {
        if (this.effectType !== FilterEffectType.color) return null;
        return this.isAppliedTo(entity) ? this.effectParameter : null;
    }

    isAppliedTo(entity) {
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

    setEffectParameter(effectParameter) {
        this.effectParameter = effectParameter;
    }

    shouldRemoveEntity(entity) {
        if (![FilterEffectType.ignore, FilterEffectType.consider].includes(this.effectType)) return false;
        const isFilterApplied = this.isAppliedTo(entity);
        if (this.effectType === FilterEffectType.ignore) return isFilterApplied;
        else if (this.effectType === FilterEffectType.consider) return !isFilterApplied;
        return false; // SHould not happen;
    }
}
