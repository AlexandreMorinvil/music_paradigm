import { adminSessionService } from '@/_services';

export default {
    initializeLogSession({ commit, rootGetters }) {
        commit('indicateCreateRequest');
        return adminSessionService.createAdminSession({
            userId: rootGetters['account/accountId'],
            experimentId: rootGetters['experiment/experimentId'],
            username: rootGetters['account/username'],
            experimentGroup: rootGetters['experiment/experimentGroup'],
            experimentName: rootGetters['experiment/experimentName'],
            experimentVersion: rootGetters['experiment/experimentVersion'],
            startTimestamp: Date.now(),
        })
            .then(
                (initializedLogSession) => {
                    commit('setAdminLogSessionId', initializedLogSession);
                },
                () => {
                    // commit('setSelectedCurriculum', createdCurriculum);
                }
            )
            .finally(() => {
                commit('indicateCreateRequestEnd');
            });
    },
}
