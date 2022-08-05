export default {
	gradeGltType,
};

function gradeGltType({ rightAnswersCount, interrogationsCount, successThreshold }) {
	const grades = [
		{
			gradeCode: 'gltGoodAnswersCount_',
			criteria: 'Correct Identifications',
			mark: rightAnswersCount,
			passMark: Math.min(successThreshold, interrogationsCount),
			topMark: interrogationsCount,
		},
	];
	return grades;
}
