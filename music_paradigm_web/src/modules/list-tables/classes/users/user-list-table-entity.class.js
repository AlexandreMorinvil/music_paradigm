import { ListTableEntity } from "../list-table-entity.class";

export class UsersListTableEntity extends ListTableEntity {
    constructor(user) {
        super(user);
    }

    get assignedParametersAssignation() {
        const { assignedParameters } = this.entity;
        return Object.entries(assignedParameters).map(([key, value]) => `${key}=${value}`);
    }

    get assignedParametersNames() {
        const { assignedParameters } = this.entity;
        return Object.keys(assignedParameters);
    }

    get assignedParametersValues() {
        const { assignedParameters } = this.entity;
        return Object.values(assignedParameters).map(value => String(value));
    }

    get progressionCompletedSessionsCount() {
        const { progressionCompletedSessionsCount } = this.entity;
        return progressionCompletedSessionsCount;
    }

    get progressionCompletedSessionsFraction() {
        const { progressionCompletedSessionsCount: completed, curriculumSessionsCount: total } = this.entity;
        return [completed, total];
    }
}