<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" isSmall color="turquoise" :isActive="isButtonActive"
        text="Deselect User" />
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
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonActive() {
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
