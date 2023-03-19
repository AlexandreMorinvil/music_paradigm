export class ProgressionSessionIdentifier {
    constructor(associativeId, associativeIdOrdinalNumber) {
        this.associativeId = associativeId;
        this.associativeIdOrdinalNumber = associativeIdOrdinalNumber;
    }

    isCorresponding(progressionSessionIdentifier) {
        return this.associativeId === progressionSessionIdentifier.associativeId &&
            this.associativeIdOrdinalNumber === progressionSessionIdentifier.associativeIdOrdinalNumber;
    }
}