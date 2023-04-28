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
}