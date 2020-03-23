module.exports = text2json;

function tryParseNumber (str) {
    if (!isNaN(Number(str))) return Number(str);
    return str;
}

function text2json(data) {
    let config = {};
    let flowConfig = {};
    let flowConfigs = [];

    let lines = data.split('\n').map(function (el) { return el.trim(); });
    lines = lines.filter(line => !line.startsWith('//') && line != '');
    let i1;
    // general info
    for (i1 = 0; i1 < lines.length; i1++) {
        const line = lines[i1];

        const equalIndex = line.indexOf('=');
        if (line.substring(0,equalIndex) == 'flow') break;
        config[line.substring(0,equalIndex)] = tryParseNumber(line.substring(equalIndex+1));
    };
    // flow    
    for (let i2 = i1+1; i2 < lines.length; i2++) {
        const line = lines[i2];
        // = then -
        const equalIndex = line.indexOf('=');
        const configKey = line.substring(0,equalIndex).replace('-', '');
        if (equalIndex == line.length - 1) {
            flowConfig[configKey] = [];
            for (let innerI = i2+1; innerI < lines.length; innerI++) {
                if (!lines[innerI].startsWith('-')) {
                    flowConfig[configKey].push(lines[innerI]);
                } else {
                    i2 = innerI - 1;
                    break;
                }                
            }
            
        } else {
            if ('type' in flowConfig && configKey == 'type') {
                flowConfigs.push(flowConfig);
                if (!flowConfig.hasOwnProperty("pictureFileName")) {
                    flowConfig.pictureFileName = [];
                }
                flowConfig = {};
            } 
            if (configKey == 'pictureFileName' || configKey == 'midiFileName') {
                flowConfig[configKey] = [tryParseNumber(line.substring(equalIndex+1))];
            } else {
                flowConfig[configKey] = tryParseNumber(line.substring(equalIndex+1));
            }
        }   
    }
    flowConfigs.push(flowConfig);
    config['flow'] = flowConfigs;

    return config;
}