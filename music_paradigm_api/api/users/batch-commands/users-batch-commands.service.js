const CurriculumModel = require('database/db').Curriculum;
const UserModel = require('database/db').User;
const { makeUsersCreationTemplateCsv } = require('modules/users/users-creation-csv');

// Exports
module.exports = {
    addTag,
    appendToNote,
    deleteUsers,
    getUsersCreationTemplateCsv,
    prependToNote,
    removeAllTags,
    removeTag,
    setGroup,
    setNote,
    setPassword,
};

async function addTag(userIdsList, tag) {
    let successesCount = 0;
    const usersList = await UserModel
        .find({ _id: { $in: userIdsList } })
        .select({ username: 1, tags: 1 });
    const failuresList = [];
    const promisesList = usersList.map(async (user) => {
        try {
            await user.addTag(tag);
            successesCount += 1;
        } catch (error) {
            failuresList.push([user.username, error]);
        }
    });
    await Promise.all(promisesList);
    return {
        failuresList,
        successesCount,
    };
}

async function appendToNote(userIdsList, noteToAppend) {
    let successesCount = 0;
    const usersList = await UserModel
        .find({ _id: { $in: userIdsList } })
        .select({ username: 1, note: 1 });
    const failuresList = [];
    const promisesList = usersList.map(async (user) => {
        try {
            await user.appendToNote(noteToAppend);
            successesCount += 1;
        } catch (error) {
            failuresList.push([user.username, error]);
        }
    });
    await Promise.all(promisesList);
    return {
        failuresList,
        successesCount,
    };
}

async function deleteUsers(userIdsList) {
    let successIdsList = [];
    const usersList = await UserModel
        .find({ _id: { $in: userIdsList } })
        .select({ username: 1, tags: 1 });
    const failuresList = [];
    const promisesList = usersList.map(async (user) => {
        try {
            await user.remove();
            successIdsList.push(user._id);
        } catch (error) {
            failuresList.push([user.username, error]);
        }
    });
    await Promise.all(promisesList);
    return {
        failuresList,
        successIdsList,
    };
}

async function getUsersCreationTemplateCsv(curriculumId) {
    const curriculum = await CurriculumModel.findById(curriculumId);
    return await makeUsersCreationTemplateCsv(curriculum);
}

async function prependToNote(userIdsList, noteToPrepend) {
    let successesCount = 0;
    const usersList = await UserModel
        .find({ _id: { $in: userIdsList } })
        .select({ username: 1, note: 1 });
    const failuresList = [];
    const promisesList = usersList.map(async (user) => {
        try {
            await user.prependToNote(noteToPrepend);
            successesCount += 1;
        } catch (error) {
            failuresList.push([user.username, error]);
        }
    });
    await Promise.all(promisesList);
    return {
        failuresList,
        successesCount,
    };
}

async function removeAllTags(userIdsList) {
    let successesCount = 0;
    const usersList = await UserModel
        .find({ _id: { $in: userIdsList } })
        .select({ username: 1, tags: 1 });
    const failuresList = [];
    const promisesList = usersList.map(async (user) => {
        try {
            await user.removeAllTags();
            successesCount += 1;
        } catch (error) {
            failuresList.push([user.username, error]);
        }
    });
    await Promise.all(promisesList);
    return {
        failuresList,
        successesCount,
    };
}

async function removeTag(userIdsList, tagToRemove) {
    let successesCount = 0;
    const usersList = await UserModel
        .find({ _id: { $in: userIdsList } })
        .select({ username: 1, tags: 1 });
    const failuresList = [];
    const promisesList = usersList.map(async (user) => {
        try {
            await user.removeTag(tagToRemove);
            successesCount += 1;
        } catch (error) {
            failuresList.push([user.username, error]);
        }
    });
    await Promise.all(promisesList);
    return {
        failuresList,
        successesCount,
    };
}

async function setGroup(userIdsList, group) {
    let successesCount = 0;
    const usersList = await UserModel
        .find({ _id: { $in: userIdsList } })
        .select({ username: 1, group: 1 });
    const failuresList = [];
    const promisesList = usersList.map(async (user) => {
        try {
            await user.setGroup(group);
            successesCount += 1;
        } catch (error) {
            failuresList.push([user.username, error]);
        }
    });
    await Promise.all(promisesList);
    return {
        failuresList,
        successesCount,
    };
}

async function setNote(userIdsList, note) {
    let successesCount = 0;
    const usersList = await UserModel
        .find({ _id: { $in: userIdsList } })
        .select({ username: 1, note: 1 });
    const failuresList = [];
    const promisesList = usersList.map(async (user) => {
        try {
            await user.setNote(note);
            successesCount += 1;
        } catch (error) {
            failuresList.push([user.username, error]);
        }
    });
    await Promise.all(promisesList);
    return {
        failuresList,
        successesCount,
    };
}

async function setPassword(userIdsList, password, isPasswordSecret = true) {
    let successesCount = 0;
    const usersList = await UserModel
        .find({ _id: { $in: userIdsList } })
        .select({ username: 1, password: 1, isPasswordSecret: 1 });
    const failuresList = [];
    const promisesList = usersList.map(async (user) => {
        try {
            await user.setPassword(password, isPasswordSecret);
            successesCount += 1;
        } catch (error) {
            failuresList.push([user.username, error]);
        }
    });
    await Promise.all(promisesList);
    return {
        failuresList,
        successesCount,
    };
}

