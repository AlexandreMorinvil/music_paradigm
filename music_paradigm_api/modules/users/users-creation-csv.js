const CurriculumModel = require('database/db').Curriculum;
const ProgressionModel = require('database/db').Progression;
const UserModel = require('database/db').User;

const { Parser: JsonToCsvParser } = require('json2csv');
const { parse: parseCsvToJson } = require('csv-parse/sync');

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

    const userToCreate = {};

    // Fill some of the base attributes
    userToCreate['username'] = userDescription[USERNAME] ?? null;
    userToCreate['password'] = userDescription[PASSWORD] ?? null;
    userToCreate['isPasswordSecret'] = userDescription[IS_PASSWORD_SECRET] ?? true;
    userToCreate['group'] = userDescription[GROUP] ?? null;

    // Retreiving all the tags
    const tagColumnsNameList = Object
        .keys(userDescription)
        .filter((tagColumnName) => tagColumnName.startsWith(TAG));
    userToCreate[TAG] = [];
    tagColumnsNameList.forEach((tagColumnName) => {
        userToCreate[TAG].push(userDescription[tagColumnName]);
    });

    // Create the user
    let user = null;
    try {
        user = await UserModel.createUser(userToCreate);
    } catch (error) {
        return {
            username: userToCreate[USERNAME],
            isCreated: false,
            hasAssignedCurriculum: false,
            detail: `(ERROR) User couldn't be created due to the following error : ${error.message}`,
        }
    }

    // Assign the curriculum if there is one
    const curriculumTitle = userDescription[CURRICULUM] ?? null;
    if (!curriculumTitle) return {
        username: userToCreate[USERNAME],
        isCreated: true,
        hasAssignedCurriculum: false,
        detail: 'User sucessfully created!',
    };

    const curriculumToAssign = curriculumTitle ? await CurriculumModel.findOne({ title: curriculumTitle }) : null;
    if (!curriculumToAssign) return {
        username: userToCreate[USERNAME],
        isCreated: true,
        hasAssignedCurriculum: false,
        detail: `(ERROR) User created, but the curriculum '${curriculumTitle}' does not exist ` +
            `and couldn't be assinged`,
    };

    let progression = null;
    try {
        progression = await ProgressionModel.createProgression(user._id, curriculumToAssign._id);
    } catch (error) {
        return {
            username: userToCreate[USERNAME],
            isCreated: true,
            hasAssignedCurriculum: true,
            detail: `(ERROR) User created, but the curriculum '${curriculumTitle}' couldn't be assinged ` +
                `due to the following error : ${error.message}`,
        }
    }

    // Assign the task parameters
    const assignedParameters = {};
    const parametersList = await curriculumToAssign.getParametersList();
    parametersList.forEach((parameter) => {
        const parameterValue = userDescription['$' + parameter.name];
        if (parameter.acceptsFreeTextValues ||
            parameter.optionValuesList.includes(parameterValue))
            assignedParameters[parameter.name] = parameterValue;
    });

    try {
        await ProgressionModel.assignParametersToProgression(progression._id, assignedParameters);
    } catch (error) {
        return {
            username: userToCreate[USERNAME],
            isCreated: true,
            hasAssignedCurriculum: true,
            detail: `(ERROR) User created, curriculum '${curriculumTitle}' assigned, ` +
                `but parameters couldn't be assinged due to the following error : ${error.message}`,
        }
    }

    // Inform if some parameters were specified even though they don't apply to the user.
    const applicableParametersNameList = parametersList.map((parameter) => '$' + parameter.name);
    const specifiedParametersNameList = Object
        .keys(userDescription)
        .filter((parameterColumnName) => {
            return tagColumnName.startsWith('$') && Boolean(userDescription[parameterColumnName]);
        });
    const superfluousParametersList = [];
    for (let specifiedParameterName of specifiedParametersNameList)
        if (!applicableParametersNameList.includes(specifiedParameterName))
            superfluousParametersList.push(specifiedParameterName);

    let warningMessages = '';
    if (superfluousParametersList.length > 0)
        warningMessages +=
            ` (WARNING) The parameter(s) ${superfluousParametersList.join(', ')} ` +
            `do not apply to the curriculum ${curriculumTitle})`;

    // Indicate a successful user creation without error
    return {
        username: userToCreate[USERNAME],
        isCreated: true,
        hasAssignedCurriculum: true,
        detail: 'User sucessfully created!' + warningMessages,
    }
}

async function createUsersFrom(csvFileContent) {

    const invalidColumnNamesList = retreiveInvalidColumnNames(csvFileContent);
    const usersDescriptionList = parseCsvToJson(csvFileContent, {
        columns: true,
        skip_empty_lines: true
    });

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
        'USERNAME'.padEnd(24, ' ') +
        'CREATED'.padEnd(12, ' ') +
        'CURRICULUM'.padEnd(12, ' ') +
        'DETAILS' +
        '\n' +
        usersCreationResultsList.map((result) => {
            const { username, isCreated, hasAssignedCurriculum, detail } = result;
            return String(username).padEnd(24, ' ') +
                String(isCreated).padEnd(12, ' ') +
                String(hasAssignedCurriculum).padEnd(12, '') +
                String(detail) +
                '\n';
        });

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
    const [columnsName, ...restOfFile] = parseCsvToJson(csvFileContent, {
        columns: false,
        skip_empty_lines: true
    });
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
    columnsName.forEach((columnName) => {
        if (!columnName.trim().startsWith(TAG) &&
            !columnName.trim().startsWith('$') &&
            !baseColumnNamesList.includes(columnName)
        ) invalidColumnNames.push(columnName);
    })

    return invalidColumnNames;
}