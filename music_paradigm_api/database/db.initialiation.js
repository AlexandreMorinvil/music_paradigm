const users = require('./schemas/user').model;
const role = require('_helpers/role');
const timeout = require('_helpers/timeout');

module.exports = {
    createDefaultAdmin
};

async function createDefaultAdmin() {
    // Verifying the existence of an administrator
    const adminFoundArray = (await timeout.dbQuery(users.find({ role: role.admin })));
    const adminExists = (adminFoundArray.length > 0) ? true : false;

    // Creating a default admin if none exists
    if (!adminExists) {
        const defaultAdminUsername = process.env.DEFAULT_ADMIN_USERNAME || 'LabMaster';
        const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'CoffeyLabInConcordia';

        await timeout.dbQuery(
            users.create({
                username: defaultAdminUsername,
                password: defaultAdminPassword,
                role: role.admin
            }));
        console.log(`A default admin was created with username : "${defaultAdminUsername}" as no admin existed.`);
    }
    return;
}