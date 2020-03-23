const config = require('config.json');
const mongoose = require('mongoose');
const mongoUrl = process.env.NODE_ENV == 'production' ? (process.env.MONGODB_URI || config.connectionStringDocker) : config.connectionStringDev;
console.log(mongoUrl);
mongoose.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('disconnected', (e) => {
    console.log(`DB disconnected!: ${e}`);
    setTimeout(() => 
    mongoose.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true })
    , 5000);
});
mongoose.connection.on('connected', () => console.log(`DB connected!`) );
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Result: require('../results/result.model')
};