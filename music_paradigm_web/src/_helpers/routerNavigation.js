import router from '@/router'

export default {
    // Experiment navigation
    moveToExperimentPrelude : function() {
        router.push({ name: 'prelude' });
    },
    moveToState : function(blockTyoe) {
        router.replace({ name: blockTyoe });
    }
}