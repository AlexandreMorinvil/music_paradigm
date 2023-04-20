<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive" :isLoading="isLoading"
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
        ...mapGetters('managementUsers', ['isExecutingUserCommand']),
        ...mapGetters('managementUsers/batchCommand', [
            'isExecutingBatchCommandAppendToNote',
            'usersBatchCommandNote',
        ]),
        ...mapGetters('managementUsers/listTableSelection', [
            'hasUsersListTableSelection',
            'usersListTableSelectionIdsList',
        ]),
        isLoading() {
            return this.isExecutingBatchCommandAppendToNote;
        },
        isButtonFrozen() {
            return !this.isExecutingBatchCommandAppendToNote && this.isExecutingUserCommand;
        },
        isButtonActive() {
            return this.hasUsersListTableSelection && Boolean(this.usersBatchCommandNote);
        },
        text() {
            return UsersBatchCommandsEnum.appendToNote;
        },
    },
    methods: {
        ...mapActions('managementUsers/batchCommand', ['executeUsersBatchCommandAppendToNote']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.executeUsersBatchCommandAppendToNote({
                idsList: this.usersListTableSelectionIdsList,
                note: this.usersBatchCommandNote,
            });
        },
    }
};
</script>

<style scoped></style>
