const config = require('config.json');
const mongoose = require('mongoose');

// MongoDB connection URL
const mongoUrl = process.env.NODE_ENV == 'production' ?
    (process.env.MONGODB_URI || config.connectionStringDocker) : config.connectionStringDev;
console.log(mongoUrl);

// Estabilishing a connection
mongoose.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true });

// Event listeners
mongoose.connection.on('connected', handleConnection);
mongoose.connection.on('disconnected', handleDisconnection);
mongoose.connection.on('error', handleError);


module.exports = {
    User: require('../users/user.model'),
    Result: require('../results/result.model')
};

/**
* Confirms the connection to the database
* @callback onConnectionCallback
 */
function handleConnection() {
    console.log(`Database connected!`);
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
* @callback onDisConnectionCallback
* @param {Error} error - The connection error that occured
*/
function handleError(error) {
    console.error(`${error}`);
}