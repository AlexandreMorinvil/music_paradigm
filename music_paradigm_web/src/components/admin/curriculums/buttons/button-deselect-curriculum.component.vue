<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="turquoise" :isActive="isButtonActive"
        :isFrozen="isButtonFrozen" v-bind="$attrs" text="Stop Managing" />
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
        ...mapGetters('managementCurriculums', ['isExecutingCurriculumCommand']),
        ...mapGetters('managementCurriculums/selection', [
            'curriculumSelectionId',
            'hasSelectedCurriculum',
        ]),
        isButtonFrozen() {
            return this.isExecutingCurriculumCommand;
        },
        isButtonActive() {
            return this.curriculumIdParameter ? this.isSelected : this.hasSelectedCurriculum;
        },
        curriculumIdParameter() {
            return this.entity?._id || this.id || null;
        },
        isSelected() {
            return this.curriculumIdParameter === this.curriculumSelectionId;
        },
    },
    methods: {
        ...mapActions('managementCurriculums', ['unsetSelectedCurriculum']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.unsetSelectedCurriculum();
        },
    }
};
</script>

<style scoped></style>
