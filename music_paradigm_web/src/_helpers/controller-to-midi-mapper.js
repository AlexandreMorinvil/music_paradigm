export default {
    getKeyToMidiNoteMapping,
    getkeyToCickerButtonMapping,
};

/**
 * Prefixes that indicates that a { prefixed-key: note } mapping is applicable to the clicker controller 
*/
const CLICKER_BUTTON_PREFIX = ['clicker1-', 'clicker2-', 'clicker3-', 'clicker4-', 'clicker5-'];


/**
 * Removes the prefixes from the mapping to get only the  { key: note } mapping
*/
function getKeyToMidiNoteMapping(keyboardToMidiMapping) {
    const MAPPING = {};
    const TEXT_TO_REMOVE_REGEX = new RegExp(CLICKER_BUTTON_PREFIX.join('|'), 'gi');
    Object.keys(keyboardToMidiMapping).forEach((key) => {
        const CLEANED_UP_KEY = String(key).replace(TEXT_TO_REMOVE_REGEX, '');
        MAPPING[CLEANED_UP_KEY] = keyboardToMidiMapping[key];
    });
    return MAPPING;
}


/**
 * Selects only the part of the key to note mapping that concerns the clicker and
 * generates the { key: clicker-button } mapping for that portion of the mapping
*/
function getkeyToCickerButtonMapping(keyboardToMidiMapping) {

    const MAPPING = {};
    const TEXT_TO_FIND_REGEX = new RegExp(CLICKER_BUTTON_PREFIX.join('|'), 'gi');
    Object.keys(keyboardToMidiMapping).forEach((key) => {
        const IS_CLICKER_RELATED = TEXT_TO_FIND_REGEX.test(key);
        if (IS_CLICKER_RELATED) {
            const CLEANED_UP_KEY = String(key).replace(TEXT_TO_FIND_REGEX, '');
            const CLICKER_BUTTON = (String(key).match(TEXT_TO_FIND_REGEX))[0].slice(0, -1);
            MAPPING[CLEANED_UP_KEY] = CLICKER_BUTTON;
        }
    });
    return MAPPING;
}
