export default {
    invertHexadecimalFormatColor,
    generateColorForTextOnBackgroundColor,
};


function invertHexadecimalFormatColor(hex) {
    hex = converHexadecimalColorTo6Digits(hex);

    // invert color components
    const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function generateColorForTextOnBackgroundColor(hex) {
    hex = converHexadecimalColorTo6Digits(hex);

    // invert color components
    const backgroundTone = [
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
    ].reduce((partialSum, a) => partialSum + a, 0) / 3;
    return backgroundTone > 128 ? '#111111' : '#eeeeee';
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function converHexadecimalColorTo6Digits(hex) {
    if (hex.indexOf('#') === 0)
        hex = hex.slice(1);

    // convert 3-digit hex to 6-digits.
    if (hex.length === 3)
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

    if (hex.length !== 6)
        throw new Error('Invalid HEX color.');

    return hex;
}