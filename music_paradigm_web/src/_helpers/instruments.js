export default {
	getInstrumentList,
	getInstrumentFile,
};

/**
 * @constant
 * @description Name of the subfolder in the static ressources of the frontend where the
 *              javascipt code of the different instruments is located.
 * @type {Array<Object>}
 */
const SUB_FOLDER = 'instruments/';

/**
 * @constant
 * @description List of the instruments availale with their names and their file
 * @type {Array<Object>}
 */
const INSTRUMENT_LIST = [
	{ name: 'piano', file: 'acoustic_grand_piano-ogg.js' },
	{ name: 'bright piano', file: 'bright_acoustic_piano-ogg.js' },
	{ name: 'celesta', file: 'celesta-ogg.js' },
	{ name: 'clavinet', file: 'clavinet-ogg.js' },
	{ name: 'ducimer', file: 'dulcimer-ogg.js' },
	{ name: 'electric grand piano', file: 'electric_grand_piano-ogg.js' },
	{ name: 'electric piano', file: 'electric_piano_1-ogg.js' },
	{ name: 'electric piano 2', file: 'electric_piano_2-ogg.js' },
	{ name: 'glockenspiel', file: 'glockenspiel-ogg.js' },
	{ name: 'gunshot', file: 'gunshot-ogg.js' },
	{ name: 'harpsichord', file: 'harpsichord-ogg.js' },
	{ name: 'honkytonk piano', file: 'honkytonk_piano-ogg.js' },
	{ name: 'marimba', file: 'marimba-ogg.js' },
	{ name: 'music box', file: 'music_box-ogg.js' },
	{ name: 'tubular bells', file: 'tubular_bells-ogg.js' },
	{ name: 'vibraphone', file: 'vibraphone-ogg.js' },
	{ name: 'xylophone', file: 'xylophone-ogg.js' },
];

/**
 * Returns the list of names of all instruments available
 * @returns {Array<String>}
 */
function getInstrumentList() {
	return INSTRUMENT_LIST.map((instrument) => instrument.name);
}

/**
 * Returns the name of the file containaing the javascript code for the instrument given in parameter.
 * If not instrument is given or if an invalid instrument is given, returns the default instrument.
 * @param {string}      name    Name of the instrument to use
 * @returns {string}    path and name of the file conataining the javascript code of the instrument (on the frontend server)
 */
function getInstrumentFile(name) {
	let instrumentFile = INSTRUMENT_LIST[0].file; // The default instrument is the first of the list

	const requestedInstrument = INSTRUMENT_LIST.filter((instrument) => {
		return instrument.name === name;
	});
	if (requestedInstrument.length > 0) instrumentFile = requestedInstrument[0].file;

	return window.location.origin + '/' + SUB_FOLDER + instrumentFile;
}
