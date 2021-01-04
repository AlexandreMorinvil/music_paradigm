require('rootpath')();
const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jwt/jwt.authentication');
const errorHandler = require('_helpers/error-handler');
const path = require("path");
const sdk = require("vuetify-file-browser-server/sdk");

// get AWS configuration from process.env
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET, FILEBROWSER_AWS_ROOT_PATH } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// serve static
app.use('/static', express.static('static'));
app.use('/experiment-ressources', express.static(path.resolve(__dirname, "../experiment_ressources")));

// use JWT auth to secure the api
app.use(jwt());


// api routes
app.use('/admin-sessions', require('admin-sessions/admin-sessions.controller'));
app.use('/account', require('account/account.controller'));
app.use('/experiments', require('experiments/experiments.controller'));
app.use('/curriculums', require('curriculums/curriculums.controller'));
app.use('/users', require('users/users.controller'));

// setup routes for file browser
app.use("/storage", sdk.Router([
    new sdk.LocalStorage(path.resolve(__dirname, "../experiment_ressources")),
    new sdk.S3Storage(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET, FILEBROWSER_AWS_ROOT_PATH)
], {
    uploadPath: path.resolve(__dirname, "../experiment_ressources")
}));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 4000) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
