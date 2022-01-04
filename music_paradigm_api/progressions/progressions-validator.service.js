module.exports = {
    isExperimentAvailable,
};


function isExperimentAvailable(history, associativeId, associativeIdOrdinalNumber) {
    return history.some(value => {
        return (value.associativeId === associativeId)
            && (value.associativeIdOrdinalNumber === associativeIdOrdinalNumber)
            && (value.isAvailable)
    });
}
