export default {
	getAnswerCorrectness,
};

function getAnswerCorrectness(correctAnswer, answerIndex) {
	if (answerIndex === null) return 'NO ANSWER GIVEN';
	if (Array.isArray(correctAnswer)) return verifyAnswerInMultipleCorrect(correctAnswer, answerIndex);
	else return verifyAnswerInSingleCorrect(correctAnswer, answerIndex);
}

function verifyAnswerInMultipleCorrect(correctAnswers, answerIndex) {
	if (correctAnswers.length < 1) return 'NO CORRECT ANSWERS';
	else if (correctAnswers.includes(answerIndex)) return 'CORRECT';
	else return 'WRONG';
}

function verifyAnswerInSingleCorrect(correctAnswer, answerIndex) {
	if (correctAnswer === null) return 'NO CORRECT ANSWERS';
	else if (correctAnswer === answerIndex) return 'CORRECT';
	else return 'WRONG';
}
