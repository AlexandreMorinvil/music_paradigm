export class CurriculumSession {
    constructor(data = {}) {
        const dataCopy = JSON.parse(JSON.stringify(data ?? {}));

		this.associativeId = dataCopy.associativeId ?? 'id0';
		this.associativeIdOrdinalNumber = dataCopy.associativeIdOrdinalNumber ?? 0;
		this.experimentReference = dataCopy.experimentReference ?? null;
		this.title = dataCopy.title ?? '';
		this.delayInDays = dataCopy.delayInDays ?? 0;
		this.releaseTime = dataCopy.releaseTime ?? '00:00';
		this.isUniqueInDay = dataCopy.isUniqueInDay ?? false;
		this.isCompletionLimited = dataCopy.isCompletionLimited ?? true;
		this.text = dataCopy.text ?? '';
    }
}