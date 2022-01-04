export default {
    isMidiFile
};

const MIDI_ENTENSION = ['mid', 'midi'];

function isMidiFile(fileName) {
    if (!fileName) return false;
    const lastPart = fileName.split('.').pop();
    const extension = lastPart ? lastPart.toLowerCase() : '';
    return MIDI_ENTENSION.includes(extension);
}
