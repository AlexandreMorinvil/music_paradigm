export default {
	editCurriculumSessionAssociativeId,
	editCurriculumSessionTaskReference,
};

function editCurriculumSessionAssociativeId(curriculumSessionsList, curriculumSessionIndex, newAssociativeId) {
	
	const curriculumSession = curriculumSessionsList[curriculumSessionIndex];
	curriculumSession.associativeId = newAssociativeId;
	updateCurriculumSessionsAssociativeIdOrdinalNumber(curriculumSessionsList);
	synchronizeCurriculumLikedSessionsTask(curriculumSessionsList, newAssociativeId);
}

function editCurriculumSessionTaskReference(curriculumSessionsList, curriculumSessionIndex, newTaskReference = null) {

	const curriculumSession = curriculumSessionsList[curriculumSessionIndex];
	curriculumSession.taskReference = newTaskReference;
	synchronizeCurriculumLikedSessionsTask(curriculumSessionsList, curriculumSession.associativeId, newTaskReference);
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
