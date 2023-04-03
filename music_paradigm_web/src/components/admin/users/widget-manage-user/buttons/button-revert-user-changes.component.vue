<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="turquoise" :isActive="isButtonActive" v-bind="$attrs"
        :text="text" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['hasEditedUser', 'isExecutingUserCommand']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonActive() {
            if (this.isExecutingUserCommand) return false;
            return this.hasEditedUser;
        },
        text() {
            return this.hasSelectedUser ? 'Revert Changes' : 'Clear';
        }
    },
    methods: {
        ...mapActions('managementUsers', ['revertUserEditions']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.revertUserEditions();
        },
    }
};
</script>

<style scoped></style>
