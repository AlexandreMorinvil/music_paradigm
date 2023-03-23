export class CurriculumSummary {
    constructor(curriculumSummary = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const curriculumSummaryCopy = JSON.parse(JSON.stringify(curriculumSummary));

        // Curriculum information
        this._id = curriculumSummaryCopy._id || null;
        this.title = curriculumSummaryCopy.title || ''; 
        this.isSequential = curriculumSummaryCopy.isSequential || null;
        this.logType = curriculumSummaryCopy.logType || '';
        this.sessionsList = curriculumSummaryCopy.sessionsList || curriculumSummaryCopy.experiments || [];

        // Timestamps
        this.createdAt = curriculumSummaryCopy.createdAt;
        this.updatedAt = curriculumSummaryCopy.updatedAt;

        // Task parameters information
        this.parameterOptionValuesListMap = curriculumSummaryCopy.parameterOptionValuesListMap || {};
        this.parameterDefaultValueMap = curriculumSummaryCopy.parameterDefaultValueMap || {};
        this.parameterAcceptsFreeTextValuesMap = curriculumSummaryCopy.parameterAcceptsFreeTextValuesMap || {};
    }

    get parametersList() {
        const parametersList = [];
        for (const parameterName in this.parameterOptionValuesListMap)
            parametersList.push({
                name: parameterName,
                optionValuesList: this.parameterOptionValuesListMap[parameterName],
                defaultValue: this.parameterDefaultValueMap[parameterName],
                acceptsFreeTextValues: this.parameterAcceptsFreeTextValuesMap[parameterName],
            })
        return parametersList;
    }

    getBlankParametersAssignation() {
        const unsetParametersAssignation = {};
        this.parametersList.forEach((parameter) => {
            unsetParametersAssignation[parameter.name] = null;
        });
        return unsetParametersAssignation;
    }
}