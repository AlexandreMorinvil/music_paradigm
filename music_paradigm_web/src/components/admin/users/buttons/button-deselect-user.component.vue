<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="turquoise" :isActive="isButtonActive"
        v-bind="$attrs" text="Deselect" />
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['isExecutingUserCommand']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonActive() {
            if (this.isExecutingUserCommand) return false;
            return this.hasSelectedUser;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['unsetSelectedUser']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.unsetSelectedUser();
        },
    }
};
</script>

<style scoped></style>
