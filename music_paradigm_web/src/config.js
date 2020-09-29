const apiUrl = process.env.NODE_ENV === 'production' ? `https://paradigm.neuro.ki.se` : `${location.protocol}//${location.hostname}:4000`;
console.log(process.env);
console.log(process.env.NODE_ENV);
console.log(apiUrl)

export default {
    apiUrl: apiUrl,
    maxRhythmError: 20
}


