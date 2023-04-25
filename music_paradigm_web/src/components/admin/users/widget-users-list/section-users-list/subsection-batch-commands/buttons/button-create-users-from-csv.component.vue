<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="green" :isActive="isButtonActive" :isLoading="isLoading"
        :isFrozen="isButtonFrozen" v-bind="$attrs" :text="text" />
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';
import { UsersBatchCommandsEnum } from '@/modules/users';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['isCreatingUsersFromCsv']),
        ...mapGetters('managementUsers/batchCommand', [
            'hasUsersCreationCsvFile',
            'isCreatingUsersFromCsv',
            'usersBatchCommandCsvFileContent',
        ]),
        isLoading() {
            return this.isCreatingUsersFromCsv;
        },
        isButtonFrozen() {
            return !this.isCreatingUsersFromCsv && this.isExecutingUserCommand;
        },
        isButtonActive() {
            return this.hasUsersCreationCsvFile;
        },
        text() {
            return UsersBatchCommandsEnum.createUsersFromCsv;
        },
    },
    methods: {
        ...mapActions('managementUsers/batchCommand', ['createUsersFromCsv']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.createUsersFromCsv({
                csvFileContent: this.usersBatchCommandCsvFileContent,
            });
        },
    }
};
</script>

<style scoped></style>
