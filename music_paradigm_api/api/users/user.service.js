﻿const ProgressionModel = require('database/db').Progression;
const UserModel = require('database/db').User;

const { generateProgressionSessionsStatusForProgression } = require('modules/progressions/progression-sessions-status');
const { generateUserSummariesList } = require('modules/users/user-summary-generator');
const progressionsService = require('../progressions/progressions.service');

// Exports
module.exports = {
    createUser,
    createUserWithCurriculum,
    getUserById,
    getUserSummariesList,
    getExistingUserGroupsList,
    deleteUser,
    updateUserProfile,
};

async function createUser(user) {
    try {
        const userCreated = await UserModel.createUser(user);
        return {
            user: userCreated,
        };
    } catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`The username is already used`);
            default:
                throw err;
        }
    }
}

async function createUserWithCurriculum(user, curriculumId, assignedParameters) {
    const { user: userCreated } = await createUser(user);
    const { progression, progressionSessionsStatus } =
        await progressionsService.assignCurriculum(userCreated._id, curriculumId, assignedParameters);
    return {
        user: userCreated,
        progression,
        progressionSessionsStatus,
    };
}

async function getUserSummariesList() {
    const usersSummariesList = await generateUserSummariesList();
    return {
        summariesList: usersSummariesList,
    } 
}

async function getUserById(userId) {
    const user = await UserModel.findById(userId);
    const progression = await ProgressionModel.getActiveProgressionByUserId(userId);
    const progressionSessionsStatus = await generateProgressionSessionsStatusForProgression(progression);
    return {
        user,
        progression,
        progressionSessionsStatus,
    };
}

async function getExistingUserGroupsList() {
    const groupsList = await UserModel.getExistingUserGroupsList();
    return groupsList;
}

async function updateUserProfile(userId, userUpdated) {
    try {
        const user = await UserModel.findById(userId);
        return await user.updateDetails(userUpdated);
    } catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`The username is already used`);
            default:
                throw err;
        }
    }
}

async function deleteUser(userId) {
    return await UserModel.delete(userId);
}