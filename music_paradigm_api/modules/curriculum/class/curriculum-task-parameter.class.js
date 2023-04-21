module.exports  = class CurriculumTaskParameter {
    constructor(parameter = {}) {
        this.name = parameter.name ?? null;
        this.optionValuesList = parameter.optionValuesList ?? [];
        this.acceptsFreeTextValues = parameter.acceptsFreeTextValues ?? null;
    }

    getUserCreationCsvTemplateFormat() {
        return { ["$" + this.name]: this.optionValuesList };
    }
}