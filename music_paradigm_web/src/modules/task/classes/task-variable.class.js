import { AssignmentType, ValueSelectionType, VariableType } from '../interfaces/assignment.interfaces';

export class TaskVariable {
    constructor(parameter = {}) {
        this.name = parameter.name ?? null,
        this.type = parameter.type ?? VariableType.variable;
        this.assignation = parameter.assignation ?? AssignmentType.constant,
        this.assignedValue = parameter.assignedValue ?? null;
        this.acceptsFreeTextValue = parameter.acceptsFreeTextValue ?? false;
        this.valueSelectionType = parameter.valueSelectionType ?? ValueSelectionType.assigned;
        this.scheduleName = parameter.scheduleName ?? null;
        this.optionValues = this._setOptionValues(parameter.optionValues);
    }

    isValueAssignmentAccepted(value) {
        // With free text values, any value assignation is accepted
        if (this.acceptsFreeTextValues) return true;
        
        // Verify if the value is part of the allowed values
        const stringifiedOptionValues = this.optionValues.map((optionValue) => String(optionValue));
        const stringifiedValue = String(value);
        if (stringifiedOptionValues.includes(stringifiedValue)) return true;
        
        // Otherwise, the assignment is refused
        return false;
    }

    _setOptionValues(options = []) {
        const optionValues = new Set(options);
        optionValues.add(this.assignedValue)
        this.optionValues = Array.from(optionValues);
        this.optionValues = this.optionValues.map((value) => String(value));
        return this.optionValues;
    }
}