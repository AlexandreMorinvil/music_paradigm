

// TODO: Erase these notes when we will be sure that the configuration file will we properly made
// "http://localhost:8080"; //fake-url

// Example of setting confitionnal to the process environment
// const apiUrl = process.env.NODE_ENV == 'production' ?
//     (process.env.MONGODB_URI || config.connectionStringDocker) : config.connectionStringDev;
// console.log(mongoUrl);

// Api Url notes
//	apiUrl: `https://api.coffeylab.ca`
// claspapi 

// TODO: Set the URL in production mode as a URL fetched as an environment variable from the docker-compose file
const apiUrl = process.env.NODE_ENV == 'production' ? `https://api.coffeylab.ca` : `${location.protocol}//${location.hostname}:4000`;

export default {
    apiUrl: apiUrl,
    maxRhythmError: 20
}

