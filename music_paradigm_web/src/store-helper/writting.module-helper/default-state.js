export default {
	DEFAULT_WRITTING_STATE,
};

function DEFAULT_WRITTING_STATE() {
	return {
		writtenInput: '',
		writtingMaxCharacters: null,
		writtingMinCharacters: null,
		writtingIsNumber: false,
	};
}
