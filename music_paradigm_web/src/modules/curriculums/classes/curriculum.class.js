import { log } from '@/_helpers';
import { CurriculumSession } from './curriculum-session.class';

export class Curriculum {
    constructor(data = {}) {
        const dataCopy = JSON.parse(JSON.stringify(data ?? {}));

        this._id = dataCopy._id ?? null;
        this.title = dataCopy.title ?? '';
		this.logType = dataCopy.logType ?? log.defaultLogType;
		this.isSequential = dataCopy.isSequential ?? true;
		this.experiments = this.generateCurriculumSessions(dataCopy.experiments ?? null);
    }

    generateCurriculumSessions(curriculumSessionsList) {
        if (!Array.isArray(curriculumSessionsList) || !curriculumSessionsList.length > 0)
            return [new CurriculumSession({ associativeId: 'session_0' })];     
        return curriculumSessionsList.map((curriculumSession) => new CurriculumSession(curriculumSession));
    }
}