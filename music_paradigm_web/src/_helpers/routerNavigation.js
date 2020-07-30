import router from '@/router'

export default {
    moveToState : function(blockTyoe) {
        router.replace({ name: blockTyoe });
    },
}