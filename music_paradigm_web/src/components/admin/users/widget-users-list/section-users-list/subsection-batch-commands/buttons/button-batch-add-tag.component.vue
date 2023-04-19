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
            'isExecutingBatchCommandAddTag',
            'usersBatchCommandTag',
        ]),
        ...mapGetters('managementUsers/listTableSelection', [
            'hasUsersListTableSelection',
            'usersListTableSelectionIdsList',
        ]),
        isLoading() {
            return this.isExecutingBatchCommandAddTag;
        },
        isButtonFrozen() {
            return !this.isExecutingBatchCommandAddTag && this.isExecutingUserCommand;
        },
        isButtonActive() {
            return this.hasUsersListTableSelection && Boolean(this.usersBatchCommandTag);
        },
        text() {
            return UsersBatchCommandsEnum.addTag;
        },
    },
    methods: {
        ...mapActions('managementUsers/batchCommand', ['executeUsersBatchCommandAddTag']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.executeUsersBatchCommandAddTag({
                idsList: this.usersListTableSelectionIdsList,
                tag: this.usersBatchCommandTag,
            });
        },
    }
};
</script>

<style scoped></style>
