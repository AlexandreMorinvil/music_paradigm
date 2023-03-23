<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" v-bind="$attrs" text="Refresh" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['isExecutingUserCommand']),
        ...mapGetters('managementUsers/progressions', ['isFetchingUserProgression']),
        ...mapGetters('managementUsers/progressions/selection', ['hasSelectedUserProgression']),
        isButtonActive() {
            if (!this.isFetchingUserProgression && this.isExecutingUserCommand) return false; // Has other user command running
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
