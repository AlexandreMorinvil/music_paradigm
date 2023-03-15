<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" text="Assign Curriculum" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['hasUserEditionChange', 'isExecutingUserCommand', 'isUpdatingUser']),
        ...mapGetters('managementUsers/edition', ['userEditionUser']),
        ...mapGetters('managementUsers/selection', ['userSelectionId', 'hasSelectedUser']),
        isButtonActive() {
            return true; 
        },
        isButtonLoading() {
            return false;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['updateUser']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            const answer = window.confirm('Are your sure you want to edit the curriculum of this user?');
            if (answer) {
                this.updateUser({
                    id: this.userSelectionId,
                    user: this.userEditionUser,
                });
            }
        },
    }
};
</script>

<style scoped></style>
