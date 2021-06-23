export default {
	EMPTY_USER,
};

function EMPTY_USER() {
	return {
		_id: null,

		username: '',
		email: '',
		role: '',
		tags: [],
		firstName: '',
		middleName: '',
		lastName: '',
		curriculum: null,

		assignedParameters: {},
		optionParameters: {},
	};
}
