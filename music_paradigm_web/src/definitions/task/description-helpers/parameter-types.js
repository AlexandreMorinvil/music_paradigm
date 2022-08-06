const TYPE_BOOLEAN = 'boolean';
const TYPE_NUMBER = 'number';
const TYPE_OBJECT = 'object';
const TYPE_STRING = 'string';

function TYPE_ARRAY_OF(type) {
    return `array of ${type}`;
}

function TYPE_ARRAY_OF_ARRAY_OF(type) {
    return `array of array of ${type}`;
}

export default {
    TYPE_ARRAY_OF,
    TYPE_ARRAY_OF_ARRAY_OF,
    TYPE_STRING,
    TYPE_NUMBER,
    TYPE_BOOLEAN,
};
