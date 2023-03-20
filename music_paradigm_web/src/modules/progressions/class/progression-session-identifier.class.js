export class ProgressionSessionIdentifier {
    constructor(parameter = {}) {
        const { associativeId, associativeIdOrdinalNumber } = parameter;
        this.associativeId = associativeId;
        this.associativeIdOrdinalNumber = associativeIdOrdinalNumber;
    }

    areEqual(progressionSessionIdentifier) {
        return this.associativeId === progressionSessionIdentifier.associativeId &&
            this.associativeIdOrdinalNumber === progressionSessionIdentifier.associativeIdOrdinalNumber;
    }

    static isCorresponding(firstSession, secondSession) {
        return new ProgressionSessionIdentifier(firstSession).areEqual(
            new ProgressionSessionIdentifier(secondSession)
        );
    }
}