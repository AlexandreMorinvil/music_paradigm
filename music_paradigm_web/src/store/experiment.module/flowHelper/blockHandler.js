export default {
    getCurrentBlock,
    getCurrentBlockType,
    getNextBlockType
}

function getCurrentBlock(flow, cursor) {

    let currentBlock = flow[cursor.current.index];
    const {
        lastRepetitionVersion,
    } = currentBlock;

    if (cursor.flag.isLastRepetition && lastRepetitionVersion)
        currentBlock = lastRepetitionVersion;

    return currentBlock;
}

function getCurrentBlockType(flow, cursor) {
    return flow[cursor.current.index].type;
}

function getNextBlockType(flow, cursor) {
    return flow[cursor.navigation.indexNext].type;
}