module.exports = class ProgressionSessionIdentifier {
    constructor(parameter = {}) {
        const { associativeId, associativeIdOrdinalNumber } = parameter;
        this.associativeId = associativeId;
        this.associativeIdOrdinalNumber = associativeIdOrdinalNumber;
    }

    areEqual(progressionSessionIdentifier) {
        return this.associativeId === progressionSessionIdentifier.associativeId &&
            this.associativeIdOrdinalNumber === progressionSessionIdentifier.associativeIdOrdinalNumber;
    }

    areLinked(progressionSessionIdentifier) {
        return this.associativeId === progressionSessionIdentifier.associativeId;
    }

    static isCorresponding(firstSession, secondSession) {
        return new ProgressionSessionIdentifier(firstSession).areEqual(
            new ProgressionSessionIdentifier(secondSession)
        );
    }

    static isLinked(fistSessionEntity, secondSessionEntity) {
        return new ProgressionSessionIdentifier(fistSessionEntity).areLinked(
            new ProgressionSessionIdentifier(secondSessionEntity)
        );
    }
}