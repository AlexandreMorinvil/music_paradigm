import { adminSessionService } from '@/_services';

export default {
    initializeLogSession({ commit, rootGetters }) {
        commit('indicateCreateRequest');
        console.log("Test start");
        return adminSessionService.createAdminSession({
            userId: rootGetters['account/accountId'],
            experimentId: rootGetters['experiment/experimentId'],
        })
            .then(
                () => {
                    console.log("Test then");
                    // commit('setSelectedCurriculum');
                },
                // error => {
                //     // commit('setSelectedCurriculum', createdCurriculum);
                // }
            )
            .finally(() => {
                console.log("Test finally");
                // commit('indicateCreateRequestEnd');
            });
    },
}
