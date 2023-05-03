<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" :color="color" :isActive="isButtonActive" :isLoading="isLoading"
        :isFrozen="isButtonFrozen" v-bind="$attrs" :text="text" />
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
    },
    computed: {
        ...mapGetters('managementTaskData/selection', [
            'beingFetchedAndSelectedTaskDataEntryId',
            'taskDataEntrySelectionId',
        ]),
        color() {
            return this.isSelected ? 'turquoise' : 'blue';
        },
        isLoading() {
            return Boolean(this.taskDataEntryId) &&
                this.beingFetchedAndSelectedTaskDataEntryId === this.taskDataEntryId;
        },
        isButtonFrozen() {
            // Fetching other task data entry
            if (this.beingFetchedAndSelectedTaskDataEntryId &&
                this.beingFetchedAndSelectedTaskDataEntryId !== this.taskDataEntryId)
                return true;
            else return false;
        },
        isButtonActive() {
            return true;
        },
        isSelected() {
            return this.taskDataEntryId === this.taskDataEntrySelectionId;
        },
        taskDataEntryId() {
            return this.entity?._id ?? null;
        },
        text() {
            return this.isSelected ? 'Stop Viewing' : 'View';
        },
    },
    methods: {
        ...mapActions('managementTaskData/selection', [
            'fetchAndSelectTaskDataEntryById',
            'unsetTaskDataEntrySelection',
        ]),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            if (this.isSelected) this.unsetTaskDataEntrySelection();
            else this.fetchAndSelectTaskDataEntryById(this.taskDataEntryId);
        },
    }
};
</script>

<style scoped></style>
