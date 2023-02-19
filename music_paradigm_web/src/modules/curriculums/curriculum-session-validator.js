export default {
	isCurriculumSessionValid,
};

function isCurriculumSessionValid(curriculumSession) {
	return isAssociativeIdValid(curriculumSession) &&
		hasTaskAssignedToCurriculum(curriculumSession);
}

function isAssociativeIdValid(curriculumSession) {
	return curriculumSession.associativeId && curriculumSession.associativeId.length > 0;
}

function isCurriculumTitleValid(curriculumSession) {
	return curriculumSession.title && curriculumSession.title.length > 0;
}

function hasTaskAssignedToCurriculum(curriculumSession) {
	return curriculumSession.experimentReference !== null && curriculumSession.experimentReference !== "";
}