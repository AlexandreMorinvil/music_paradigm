const assignUser = function(targetUser, sourceUser) {
	// Destructure only the required data from the received user
	const{
		_id,
		username,
		email,
		role,
		firstName,
		middleName,
		lastName,
		tasks: { curriculums } = {},
		tasks: { progression } = {}
	} = sourceUser;

	// Assign only the required data to store user
	Object.assign(targetUser, {
		_id: _id || null,
		username: username || null,
		email: email || null,
		role: role || null,
		firstName: firstName || null,
		middleName: middleName || null,
		lastName: lastName || null,
		tasks: {
			curriculums: curriculums || [],
			progression: progression || []
		}
	});
};

export default{
	assignUser
};
