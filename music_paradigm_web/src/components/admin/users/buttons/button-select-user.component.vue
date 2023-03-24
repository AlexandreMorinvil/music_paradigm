<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive" :isLoading="isLoading"
        :isFrozen="isButtonFrozen" v-bind="$attrs" text="Select" />
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    props: {
        entity: {
            type: null,
            default: null,
        },
        userId: {
            type: null,
            default: null,
        }
    },
    computed: {
        ...mapGetters('managementUsers', ['isExecutingUserCommand', 'isFetchingUser']),
        arguments() {
            return this.entity?._id ?? this.userId ?? null;
        },
        isLoading() {
            return this.isFetchingUser;
        },
        isButtonFrozen() {
            return !this.isFetchingUser && this.isExecutingUserCommand;
        },
        isButtonActive() {
            return true;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['fetchAndSelectUserById']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.fetchAndSelectUserById(this.arguments);
        },
    }
};
</script>

<style scoped></style>
