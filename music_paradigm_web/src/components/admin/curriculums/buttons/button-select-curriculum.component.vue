<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive" :isLoading="isLoading"
        :isFrozen="isButtonFrozen" v-bind="$attrs" text="Manage" />
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
        id: {
            type: null,
            default: null,
        }
    },
    computed: {
        ...mapGetters('managementCurriculums', [
            'fetchingAndSelectingCurriculumId',
            'isExecutingCurriculumCommand',
        ]),
        ...mapGetters('managementCurriculums/selection', ['curriculumSelectionId']),
        isLoading() {
            return Boolean(this.curriculumIdParameter) &&
                this.fetchingAndSelectingCurriculumId === this.curriculumIdParameter;
        },
        isButtonFrozen() {
            // Fetching other user
            if (!!this.fetchingAndSelectingCurriculumId &&
                this.fetchingAndSelectingCurriculumId !== this.curriculumIdParameter)
                return true;
            // Executing other user command
            return !this.fetchingAndSelectingCurriculumId && this.isExecutingCurriculumCommand;
        },
        isButtonActive() {
            return Boolean(this.curriculumIdParameter) && !this.isSelected;
        },
        isSelected() {
            return this.curriculumIdParameter === this.curriculumSelectionId;
        },
        curriculumIdParameter() {
            return this.entity?._id ?? this.id ?? null;
        },
    },
    methods: {
        ...mapActions('managementCurriculums', ['fetchAndSelectCurriculumById']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.fetchAndSelectCurriculumById(this.curriculumIdParameter);
        },
    }
};
</script>

<style scoped></style>
