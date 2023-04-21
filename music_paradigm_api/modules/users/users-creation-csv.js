const { Parser } = require('json2csv');
// const parseCsv = require('csv-parse/lib/sync');

// Exports
module.exports = {
    makeUsersCreationTemplateCsv,
};

async function makeUsersCreationTemplateCsv(curriculumDocument) {

    const explainationRow = {
        USERNAME: "my_username",
        PASSWORD: "my_password",
        IS_PASSWORD_SECRET: "true or false",
        GROUP: "my_group",
        NOTE: "This user was generated from a csv file. ",
        TAG_1: "first_tag",
        TAG_2: "second_tag",
        CURRICULUM: "",
    }

    if (curriculumDocument) {
        Object.assign(explainationRow, { CURRICULUM: curriculumDocument.title });

        const parametersList = await curriculumDocument.getParametersList();
        parametersList.forEach((curriculumTaskParameter) =>
            Object.assign(
                explainationRow,
                curriculumTaskParameter.getUserCreationCsvTemplateFormat(),
            )
        );
    }

    const exampleRowsList = [explainationRow];

    // Generate csv file
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