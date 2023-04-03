<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Refresh" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['isExecutingUserCommand']),
        ...mapGetters('managementUsers/progressions', ['isFetchingUserProgression']),
        ...mapGetters('managementUsers/progressions/selection', ['hasSelectedUserProgression']),
        isButtonFrozen() {
            return !this.isFetchingUserProgression && this.isExecutingUserCommand; // Has other user command running
        },
        isButtonActive() {
            return this.hasSelectedUserProgression;
        },
        isButtonLoading() {
            return this.isFetchingUserProgression;
        },
    },
    methods: {
        ...mapActions('managementUsers/progressions', ['refreshSelectedUserProgression']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.refreshSelectedUserProgression();
        },
    }
};
</script>

<style scoped></style>
