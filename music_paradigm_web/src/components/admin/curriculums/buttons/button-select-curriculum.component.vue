<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Manage" />
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    props: {
        entity: {
            type: Object,
            default: null,
        },
        userId: {
            type: null,
            default: null,
        }
    },
    computed: {
        ...mapGetters('managementUsers', [
            'fetchingAndSelectingUserId',
            'isExecutingUserCommand',
        ]),
        ...mapGetters('managementUsers/selection', [
            'userSelectionId',
        ]),
        isLoading() {
            return Boolean(this.userIdParameter) && this.fetchingAndSelectingUserId === this.userIdParameter;
        },
        isButtonFrozen() {
            // Fetching other user
            if (!!this.fetchingAndSelectingUserId && this.fetchingAndSelectingUserId !== this.userIdParameter) return true;
            // Executing other user command
            return !this.fetchingAndSelectingUserId && this.isExecutingUserCommand;
        },
        isButtonActive() {
            return Boolean(this.userIdParameter) && !this.isSelected;
        },
        isSelected() {
            return this.userIdParameter === this.userSelectionId;
        },
        userIdParameter() {
            return this.entity?._id ?? this.userId ?? null;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['fetchAndSelectUserById']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.fetchAndSelectUserById(this.userIdParameter);
        },
    }
};
</script>

<style scoped></style>
