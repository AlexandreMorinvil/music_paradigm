const { Parser } = require('json2csv');
// const parseCsv = require('csv-parse/lib/sync');

// Exports
module.exports = {
    makeUsersCreationTemplateCsv,
};

async function makeUsersCreationTemplateCsv(curriculumDocument) {

    // Generate explaination row.
    const explainationRow = {
        USERNAME: "(This row must be erased)",
        PASSWORD: "my_password",
        IS_PASSWORD_SECRET: "true or false",
        GROUP: "my_group",
        NOTE: "Note to assign to the user. ",
        TAG_1: "a_first_tag",
        TAG_2: "a_second_tag",
        CURRICULUM: "curriculum_title",
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
            USERNAME: "example_user_" + (index + 1),
            PASSWORD: Math.random().toString(36).slice(2, 10),
            IS_PASSWORD_SECRET: Math.random() < 0.5,
            CURRICULUM: curriculumDocument?.title ?? "",
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
    const parser = new Parser({ header: true });
    const csv = parser.parse(exampleRowsList);
    return csv;
}

async function createUsersFromCsv(usersCreationCsv) {
    //     //the dataset
    //     const input = `
    // col1,col2,col3,col4
    // aaa1,aaa_1,aaa3,aaa4
    // bbb1,bbb_2,bbb3,bbb4
    // ccc1,ccc_3,ccc3,ccc4
    // `;

    //     //calling the npm package and save to records
    //     const records = parseCsv(input, {
    //       columns: true,
    //       skip_empty_lines: true
    //     });

    //     //map the output from csv-parse to the column
    //     const column_two = records.map(rec => rec["col2"]);
}