module.exports = {
    fixSpaces,
    capitalizeFirstLetters,
};

function fixSpaces(str) {
    return str.trim().replace(/ +(?= )/g,'');
}

function capitalizeFirstLetters(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}