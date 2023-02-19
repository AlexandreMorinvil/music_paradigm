import curriculumGenerator from './curriculum-generator';

export default {
	addCurriculumSessionToList,
	editCurriculumSessionAssociativeId,
	editCurriculumSessionTaskReference,
	moveCurriculumSessionInList,
	removeCurriculumSessionFromList,
};

function addCurriculumSessionToList(curriculumSessionsList, indexCurriculumSession, isAddedBefore = true) {
	const generateRandomString = () => (Math.random() + 1).toString(36).substring(8);
	const newCurriculumSession = curriculumGenerator.GENERATE_BLANK_CURRICULUM_SESSION(
		`session_${generateRandomString()}`
	);
	if (isAddedBefore)
		curriculumSessionsList.splice(indexCurriculumSession, 0, newCurriculumSession);
	else
		curriculumSessionsList.splice(indexCurriculumSession + 1, 0, newCurriculumSession);
}

function editCurriculumSessionAssociativeId(curriculumSessionsList, indexCurriculumSession, newAssociativeId) {

	const curriculumSession = curriculumSessionsList[indexCurriculumSession];
	curriculumSession.associativeId = newAssociativeId;
	updateCurriculumSessionsAssociativeIdOrdinalNumber(curriculumSessionsList);
	synchronizeCurriculumLikedSessionsTask(curriculumSessionsList, newAssociativeId);
}

function editCurriculumSessionTaskReference(curriculumSessionsList, indexCurriculumSession, newTaskReference = null) {

	const curriculumSession = curriculumSessionsList[indexCurriculumSession];
	curriculumSession.taskReference = newTaskReference;
	synchronizeCurriculumLikedSessionsTask(curriculumSessionsList, curriculumSession.associativeId, newTaskReference);
}

function moveCurriculumSessionInList(
	curriculumSessionsList,
	indexCurriculumSessionToMove,
	indexCurriculumSessionTargetPosition) {
	const curriculumSessionToMove = curriculumSessionsList.splice(indexCurriculumSessionToMove, 1).pop();
	if (indexCurriculumSessionTargetPosition > indexCurriculumSessionToMove) {
		curriculumSessionsList.splice(indexCurriculumSessionTargetPosition - 1, 0, curriculumSessionToMove);
		return indexCurriculumSessionTargetPosition - 1;
	}
	else {
		curriculumSessionsList.splice(indexCurriculumSessionTargetPosition, 0, curriculumSessionToMove);
		return indexCurriculumSessionTargetPosition;
	}
}

function removeCurriculumSessionFromList(curriculumSessionsList, indexCurriculumSessionToRemove) {
	curriculumSessionsList.splice(indexCurriculumSessionToRemove, 1);
}

function synchronizeCurriculumLikedSessionsTask(curriculumSessionsList, associativeId, newTaskReference = null) {

	const curriculumSessionsToSynchronizeList = curriculumSessionsList.filter((curriculumSession) => {
		return curriculumSession.associativeId === associativeId;
	});

	const taskReferenceToAssign = newTaskReference ?
		newTaskReference :
		curriculumSessionsToSynchronizeList[0].experimentReference;

	curriculumSessionsToSynchronizeList.forEach((curriculumSession) => {
		curriculumSession.experimentReference = taskReferenceToAssign;
	});
}

function updateCurriculumSessionsAssociativeIdOrdinalNumber(curriculumSessionsList) {

	const numberOfOccurencesByAssociativeIdMap = {}
	curriculumSessionsList.forEach((curriculumSession) => {

		const associativeId = curriculumSession.associativeId;

		if (!numberOfOccurencesByAssociativeIdMap[associativeId])
			numberOfOccurencesByAssociativeIdMap[associativeId] = 0;

		curriculumSession.associativeIdOrdinalNumber = numberOfOccurencesByAssociativeIdMap[associativeId];

		numberOfOccurencesByAssociativeIdMap[associativeId] += 1;
	});
}
