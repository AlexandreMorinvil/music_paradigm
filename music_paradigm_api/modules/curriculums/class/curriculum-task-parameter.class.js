module.exports = class CurriculumTaskParameter {
    constructor(parameter = {}) {
        this.name = parameter.name ?? null;
        this.optionValuesList = parameter.optionValuesList ?? [];
        this.acceptsFreeTextValues = parameter.acceptsFreeTextValues ?? null;
    }

    getRandomValuePick() {
        const choicesList = [...this.optionValuesList];
        const index = Math.floor(Math.random() * choicesList.length);
        return { ["$" + this.name]: choicesList[index] };
    }

    getUserCreationCsvTemplateFormat() {
        return { ["$" + this.name]: this.optionValuesList };
    }

    isValueAssignationAccepted(value) {
        // With free text values, any value assignation is accepted
        if (this.acceptsFreeTextValues) return true;
        
        // Verify if the value is part of the allowed values
        const stringifiedOptionValues = this.optionValuesList.map((optionValue) => String(optionValue))
        const stringifiedValue = String(value);
        if (stringifiedOptionValues.includes(stringifiedValue)) return true;
        
        // Otherwise, the assignation is refused
        return false;
    }
}