import { UserSummary } from "./user-summary.class"

export class UserSummariesManager {
    constructor(userSummariesList = []) {
        this.userSummariesList = [];
        this.setUsersSummariesList(userSummariesList);
    }

    getUserSummaryById(curriculumId) {
        return this.userSummariesList.find((userSummary) => {
            return userSummary._id === curriculumId;
        });
    }

    getUserSummariesByIdsList(userIdsList) {
        const userSummariesList = this.userSummariesList.filter((userSummary) => {
            return userIdsList.includes(userSummary._id);
        });
        return userSummariesList;
    }

    setUsersSummariesList(userSummariesList = []) {
        this.userSummariesList = userSummariesList.map((userSummary) => {
            return new UserSummary(userSummary);
        });
        this.userSummariesList.sort((a, b) => {
            return String(a.username).localeCompare(String(b.username))
        });
    }
}