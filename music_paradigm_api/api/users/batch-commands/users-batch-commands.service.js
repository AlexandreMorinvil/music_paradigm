const mongoose = require("mongoose");
const ProgressionModel = require('database/db').Progression;
const UserModel = require('database/db').User;

// Exports
module.exports = {
    addTag,
};

async function addTag(userIdsList, tag) {
    if (!tag) throw Error('The tag value is invalid');
    const castedIdsList = userIdsList.map((id) => mongoose.Types.ObjectId(id));
    const queryResult = await UserModel.updateMany(
        {
            _id: { $in: castedIdsList },
            tags: { $ne: [tag].flat() }, // We ignore the users that already have the tag.
        },
        {
            $push: {
                tags: {
                    $each: [tag].flat(),
                    $sort: 1,
                }
            }
        },
        { upsert: false },
    );
    return {
        queryResult,
    };
}

// async function createUserWithCurriculum(user, curriculumId, assignedParameters) {
//     try {
//         const { user: userCreated }  = await createUser(user);
//         const { progression, progressionSessionsStatus } =
//             await progressionsService.assignCurriculum(userCreated._id, curriculumId, assignedParameters);
//         return {
//             user: userCreated,
//             progression: progression,
//             progressionSessionsStatus: progressionSessionsStatus,
//         };
//     } catch (err) {
//         throw err;
//     }
// }

// async function getAll() {
//     try {
//         return await generateUserSummariesList();
//     } catch (err) {
//         throw err;
//     }
// }

// async function getUserById(userId) {
//     try {
//         const user = await UserModel.findById(userId).lean();
//         const lastProgression = await ProgressionModel.getActiveProgressionByUserId(userId);
//         const progressionSessionsStatus = await generateProgressionSessionsStatusForProgression(lastProgression);
//         return {
//             user: user,
//             progression: lastProgression,
//             progressionSessionsStatus: progressionSessionsStatus,
//         };
//     } catch (err) {
//         throw err;
//     }
// }

// async function getExistingUserGroupsList() {
//     try {
//         const groupsList = await UserModel.getExistingUserGroupsList();
//         return groupsList;
//     } catch (err) {
//         throw err;
//     }
// }

// async function updateUserProfile(userId, userUpdated) {
//     try {
//         const user = await UserModel.findById(userId);
//         return await user.updateDetails(userUpdated);
//     } catch (err) {
//         switch (err.code) {
//             case 11000:
//                 throw new Error(`The username is already used`);
//             default:
//                 throw err;
//         }
//     }
// }

// async function deleteUser(userId) {
//     try {
//         return await UserModel.delete(userId);
//     } catch (err) {
//         throw err;
//     }
// }