import { ListTableEntity } from "./list-table-entity.class";

export class UsersListTableEntity extends ListTableEntity {
    constructor(user) {
        super(user);
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