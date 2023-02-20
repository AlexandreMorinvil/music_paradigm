const databaseInitialValues = require('./database-initial-values');
const performConvertions = require('../conversions/conversions');


async function initializeDatabase() {
    databaseInitialValues.createDefaultAdmin();
    performConvertions();
}

module.exports = initializeDatabase;