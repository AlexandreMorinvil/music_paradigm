import { adminSessionService } from '@/_services';

export default {
    createSimpleLog({ commit, rootGetters }) {
        const simpleLog = {
            userId: rootGetters['account/accountId'],
            experimentId: rootGetters['experiment/experimentId'],

            username: rootGetters['account/username'],
            experimentGroup: rootGetters['experiment/experimentGroup'],
            experimentName: rootGetters['experiment/experimentName'],
            experimentVersion: rootGetters['experiment/experimentVersion'],
    
            startTimestamp: { type: Date, default: Date.now },
    
            blockType: rootGetters['experiment/currentStateType'],
            blockSubType: rootGetters['experiment/playingMode'],
            timestamp: Date.now(),

            ...rootGetters['piano/pianoSimpleLogSummary'],
            ...rootGetters['piano/pianoSimpleLogPreprocesed'],
        }
        commit('indicateCreateRequest');
        return adminSessionService.createSimpleLog(simpleLog)
            .then(
                (addedBlock) => {
                    console.log(addedBlock);
                },
                (error) => {
                    console.log(error);
                }
            )
            .finally(() => {
                commit('indicateCreateRequestEnd');
            });
    },

    initializeLogSession({ commit, rootGetters }) {
        const sessionLogHeader = {
            userId: rootGetters['account/accountId'],
            experimentId: rootGetters['experiment/experimentId'],
            username: rootGetters['account/username'],
            experimentGroup: rootGetters['experiment/experimentGroup'],
            experimentName: rootGetters['experiment/experimentName'],
            experimentVersion: rootGetters['experiment/experimentVersion'],
            startTimestamp: Date.now(),
        }
        commit('indicateCreateRequest');
        return adminSessionService.createAdminSession(sessionLogHeader)
            .then(
                (initializedLogSession) => {
                    commit('setAdminLogSessionId', initializedLogSession);
                },
                (error) => {
                    console.log(error);
                    // commit('setSelectedCurriculum', createdCurriculum);
                }
            )
            .finally(() => {
                commit('indicateCreateRequestEnd');
            });
    },

    addBlockToLogSession({ commit, getters, rootGetters }) {
        const block = {
            blockType: rootGetters['experiment/currentStateType'],
            timestamp: Date.now(),
            notes: rootGetters['piano/pianoLogSummary'],
        }
        commit('indicateAddBlockRequest');
        return adminSessionService.addBlock(getters.logSessionId, block)
            .then(
                (addedBlock) => {
                    console.log(addedBlock);
                },
                (error) => {
                    console.log(error);
                }
            )
            .finally(() => {
                commit('indicateAddBlockRequestEnd');
            });
    },
}
