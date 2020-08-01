import router from '@/router'

export default {
    // Experiment navigation
    moveToExperimentPrelude : function() {
        router.push({ name: 'prelude' });
    },
    moveToState : function(blockTyoe) {
        router.replace({ name: blockTyoe });
    },
    // Redirect to home page
    goToRootPage : function() {
        router.push({ path: '/' });
    },
    goToHomePage : function(role) {
        switch (role) {
            case "admin": router.push({ path: '/admin' }); break;
            default: router.push({ path: '/user' }); break;
        }
    }
}