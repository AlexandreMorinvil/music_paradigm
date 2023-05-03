<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="turquoise" :isActive="isButtonActive"
        :isFrozen="isButtonFrozen" v-bind="$attrs" text="Stop viewing" />
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementTaskData/selection', ['hasSelectedTaskDataEntry']),
        isButtonFrozen() {
            return false;
        },
        isButtonActive() {
            return this.hasSelectedTaskDataEntry;
        },
    },
    methods: {
        ...mapActions('managementTaskData/selection', ['unsetTaskDataEntrySelection']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.unsetTaskDataEntrySelection();
        },
    }
};
</script>

<style scoped></style>
