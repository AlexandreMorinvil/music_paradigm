const config = require('config.json');
const mongoose = require('mongoose');
const initializeDatabase = require('./initialization/initialization');

// MongoDB connection URL
const mongoUrl = process.env.NODE_ENV == 'production' ?
    (process.env.MONGODB_URI || config.connectionStringDocker) : config.connectionStringDev;
console.log(mongoUrl);

// Estabilishing a connection
mongoose.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

// Event listeners
mongoose.connection.on('connected', handleConnection);
mongoose.connection.on('disconnected', handleDisconnection);
mongoose.connection.on('error', handleError);

// Exporting the Models
module.exports = {
    Experiment: require('./models/experiment/experiment.model'),
    Curriculum: require('./models/curriculum/curriculum.model'),
    Progression: require('./models/progression/progression.model'),
    User: require('./models/user/user.model'),
    ExperimentMarker: require('./models/experiment-marker/experiment-marker.model'),
    AdminLogThorough: require('./models/log-thorough/log-thorough.model').adminModel,
    LogThorough: require('./models/log-thorough/log-thorough.model').model,
};

/**
* Confirms the connection to the database
* @callback onConnectionCallback
*/
function handleConnection() {
    console.log(`Database connected!`);
    try {
        initializeDatabase();
    } catch (error) {
        console.log(`An error occured while trying to initialize the database : ${error}`);
    }
}

/**
* Indicates a disconnection to the database and reattemp connection after a delay
* @callback onDisConnectionCallback
*/
function handleDisconnection() {
    console.log(`Database disconnected!`);
    setTimeout(() =>
        mongoose.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true })
        , 5000);
}

/**
* Indicates a disconnection to the database and reattemp connection after a delay
* @callback onErrorCallback
* @param {Error} error  The connection error that occured
*/
function handleError(error) {
    console.error(`${error}`);
}