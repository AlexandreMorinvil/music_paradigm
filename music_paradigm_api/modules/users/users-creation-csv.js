const CurriculumModel = require('database/db').Curriculum;
const ProgressionModel = require('database/db').Progression;
const UserModel = require('database/db').User;

const { Parser: JsonToCsvParser } = require('json2csv');

const { getColumnsNameListFromCsv, parseCsvToJson } = require('_helpers/csv-handler');

// Exports
module.exports = {
    createUsersFrom,
    makeUsersCreationTemplateCsv,
};

// Column names
const USERNAME = 'USERNAME';
const PASSWORD = 'PASSWORD';
const IS_PASSWORD_SECRET = 'IS_PASSWORD_SECRET';
const GROUP = 'GROUP';
const NOTE = 'NOTE';
const TAG = 'TAG';
const CURRICULUM = 'CURRICULUM';

async function createUser(userDescription) {

    const interpretBoolean = (textBoolean) => { 
        if (textBoolean.trim().toLowerCase() === 'true') return true;
        else if (textBoolean.trim().toLowerCase() === 'false') return false;
        return null;
    }
    
    // Fill some of the base attributes
    const userToCreate = {};
    userToCreate['username'] = userDescription[USERNAME] ?? null;
    userToCreate['isPasswordSecret'] = interpretBoolean(userDescription[IS_PASSWORD_SECRET]) ?? false;
    userToCreate['password'] = userDescription[PASSWORD] ?? null;
    userToCreate['group'] = userDescription[GROUP] ?? null;
    userToCreate['note'] = userDescription[NOTE] ?? null;
    userToCreate['tags'] = [];

    // Retreiving all the tags
    const tagColumnsNameList = Object
        .keys(userDescription)
        .filter((tagColumnName) => tagColumnName.startsWith(TAG));
    tagColumnsNameList.forEach((tagColumnName) => {
        userToCreate['tags'].push(userDescription[tagColumnName]);
    });

    // Create the user
    let user = null;
    try {
        user = await UserModel.createUser(userToCreate);
    } catch (error) {
        return {
            username: userDescription[USERNAME],
            isCreated: false,
            hasAssignedCurriculum: false,
            detail: `(ERROR) User couldn't be created due to the following error : ${error.message}`,
        }
    }

    // If the user created did not have a username, we indicate the username generated for that user.
    const usernameUsed = userDescription[USERNAME] || user?.username;
    const wasUsernameGenerated = usernameUsed !== userDescription[USERNAME];
    const usernameGenerationDetail = wasUsernameGenerated ? 
        ` (INFO) The username "${usernameUsed}" was generated `: '';

    const hadProvidedUsername = Boolean(userDescription[USERNAME]);
    const usernameGenerationReason = (wasUsernameGenerated && !hadProvidedUsername) ?
        'since no username was provided. ' : '';
    
    let detailsCumulated = usernameGenerationDetail + usernameGenerationReason;

    // Assign the curriculum if there is one
    const curriculumTitle = userDescription[CURRICULUM] ?? null;
    if (!curriculumTitle) return {
        username: usernameUsed,
        isCreated: true,
        hasAssignedCurriculum: false,
        detail: 'User sucessfully created!' + detailsCumulated,
    };

    const curriculumToAssign = curriculumTitle ? await CurriculumModel.findOne({ title: curriculumTitle }) : null;
    if (!curriculumToAssign) return {
        username: usernameUsed,
        isCreated: true,
        hasAssignedCurriculum: false,
        detail: `(ERROR) User created, but the curriculum '${curriculumTitle}' does not exist ` +
            `and couldn't be assinged` + detailsCumulated,
    };

    let progression = null;
    try {
        progression = await ProgressionModel.createProgression(user._id, curriculumToAssign._id);
    } catch (error) {
        return {
            username: usernameUsed,
            isCreated: true,
            hasAssignedCurriculum: true,
            detail: `(ERROR) User created, but the curriculum '${curriculumTitle}' couldn't be assinged ` +
                `due to the following error : ${error.message}` + detailsCumulated,
        }
    }

    // Assign the task parameters
    const assignedParameters = {};
    const parametersList = await curriculumToAssign.getParametersList();
    parametersList.forEach((parameter) => {
        const parameterValue = userDescription['$' + parameter.name];
        if (parameter.isValueAssignationAccepted(parameterValue))
            assignedParameters[parameter.name] = parameterValue;
    });

    try {
        await ProgressionModel.assignParametersToProgression(progression._id, assignedParameters);
    } catch (error) {
        return {
            username: usernameUsed,
            isCreated: true,
            hasAssignedCurriculum: true,
            detail: `(ERROR) User created, curriculum '${curriculumTitle}' assigned, ` +
                `but parameters couldn't be assinged due to the following error : ${error.message}` + detailsCumulated,
        }
    }

    // Inform if some parameters were specified even though they don't apply to the user.
    const applicableParametersNameList = parametersList.map((parameter) => '$' + parameter.name);
    const specifiedParametersNameList = Object
        .keys(userDescription)
        .filter((parameterColumnName) => {
            return parameterColumnName.startsWith('$') && Boolean(userDescription[parameterColumnName]);
        });
    const superfluousParametersList = [];
    for (let specifiedParameterName of specifiedParametersNameList)
        if (!applicableParametersNameList.includes(specifiedParameterName))
            superfluousParametersList.push(specifiedParameterName);

    let warningMessages = '';
    if (superfluousParametersList.length > 0)
        warningMessages +=
            ` ((WARNING) The parameter(s) ${superfluousParametersList.join(', ')} ` +
            `do not apply to the curriculum ${curriculumTitle})`;

    // Indicate a successful user creation without error
    return {
        username: usernameUsed,
        isCreated: true,
        hasAssignedCurriculum: true,
        detail: 'User sucessfully created!' + detailsCumulated + warningMessages,
    }
}

async function createUsersFrom(csvFileContent) {

    const invalidColumnNamesList = retreiveInvalidColumnNames(csvFileContent);
    const usersDescriptionList = parseCsvToJson(csvFileContent);

    const creationResultsList = [];
    const promisesList = usersDescriptionList.map(async (userDescription) => {
        const creationResult = await createUser(userDescription);
        creationResultsList.push(creationResult);
    })
    await Promise.all(promisesList);

    const reportText = generateUsersCreationReport(invalidColumnNamesList, creationResultsList);
    return reportText;
}

function generateUsersCreationReport(invalidColumnNamesList, usersCreationResultsList) {
    const writeSeparation = (text) =>
        '\n' +
        '========================================================================================\n' +
        text + '\n' +
        '========================================================================================\n' +
        '\n';


    const columnsProblemText = writeSeparation('General details') +
        invalidColumnNamesList.map((invalidColumnName) => {
            return `The column ${invalidColumnName} is not recognized. All information from this column was ignored.\n`;
        });

    const usersCreationResultsText = writeSeparation('Users creation details') +
        'USERNAME'.padEnd(26, ' ') +
        'CREATED'.padEnd(12, ' ') +
        'CURRICULUM'.padEnd(12, ' ') +
        'DETAILS' +
        '\n' +
        usersCreationResultsList.map((result) => {
            const { username, isCreated, hasAssignedCurriculum, detail } = result;
            return String(username).padEnd(26, ' ') +
                String(isCreated).padEnd(12, ' ') +
                String(hasAssignedCurriculum).padEnd(12, ' ') +
                String(detail) +
                '\n';
        }).join('');

    let report = '';
    if (invalidColumnNamesList.length > 0) report += columnsProblemText;
    report += usersCreationResultsText;

    return report;
}

async function makeUsersCreationTemplateCsv(curriculumDocument) {

    // Generate explaination row.
    const explainationRow = {
        [USERNAME]: "(This row must be erased)",
        [PASSWORD]: "my_password",
        [IS_PASSWORD_SECRET]: "true or false",
        [GROUP]: "my_group",
        [NOTE]: "Note to assign to the user. ",
        [TAG + '1']: "a_first_tag",
        [TAG + '2']: "a_second_tag",
        [CURRICULUM]: "curriculum_title",
    }

    let parametersList = [];
    if (curriculumDocument) {
        parametersList = await curriculumDocument.getParametersList();
        parametersList.forEach((curriculumTaskParameter) =>
            Object.assign(
                explainationRow,
                curriculumTaskParameter.getUserCreationCsvTemplateFormat(),
            )
        );
    }

    // Generate examples
    const exampleUsersList = [];
    for (let index = 0; index < 10; index++) {
        const exampleRow = {
            [USERNAME]: "example_user_" + (index + 1),
            [PASSWORD]: Math.random().toString(36).slice(2, 10),
            [IS_PASSWORD_SECRET]: Math.random() < 0.5,
            [CURRICULUM]: curriculumDocument?.title ?? "",
        };

        parametersList.forEach((curriculumTaskParameter) =>
            Object.assign(
                exampleRow,
                curriculumTaskParameter.getRandomValuePick(),
            )
        );

        exampleUsersList.push(exampleRow);
    }

    // Generate csv file
    const exampleRowsList = [explainationRow, ...exampleUsersList];
    const parser = new JsonToCsvParser({ header: true });
    const csv = parser.parse(exampleRowsList);
    return csv;
}


function retreiveInvalidColumnNames(csvFileContent) {
    const columnsNameList = getColumnsNameListFromCsv(csvFileContent);
    const baseColumnNamesList = [
        USERNAME,
        PASSWORD,
        IS_PASSWORD_SECRET,
        GROUP,
        NOTE,
        TAG,
        CURRICULUM,
    ];

    const invalidColumnNames = [];
    columnsNameList.forEach((columnName) => {
        if (!columnName.trim().startsWith(TAG) &&
            !columnName.trim().startsWith('$') &&
            !baseColumnNamesList.includes(columnName)
        ) invalidColumnNames.push(columnName);
    })

    return invalidColumnNames;
}