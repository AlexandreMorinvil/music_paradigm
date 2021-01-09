// This code is put in a function as it is used in more than one mutation
export default {
	selectConsideredNotes,
};

function selectConsideredNotes(allKeys, startIndex) {
	const keys = JSON.parse(JSON.stringify(allKeys));

	keys.keys.splice(0, startIndex);
	keys.time.splice(0, startIndex);
	keys.duration.splice(0, startIndex);

	return keys;
}
