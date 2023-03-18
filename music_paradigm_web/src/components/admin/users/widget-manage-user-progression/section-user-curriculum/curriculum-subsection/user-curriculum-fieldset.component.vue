<template>
    <TemplateFieldsetComponent>
        <TemplateFieldLabelComponent text="Curriculum" />
        <TemplateFieldSelectComponent 
            :value="userProgressionEditionCurriculumReference"
            :expectedValue="userProgressionSelectionCurriculumReference"
            v-on:edit="editUserProgressionEditionCurriculumReference"
            isEmptyAccepted
            :getDisplayedValueFromElement="(curriculumSummary) => curriculumSummary.title"
            :getOptionValueFromElement="(curriculumSummary) => curriculumSummary._id" :options="curriculumSummariesList"
            placeholder="# No Curriculum" />
    </TemplateFieldsetComponent>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import TemplateFieldsetComponent from '@/components/admin/templates/template-fieldset.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/templates/template-field-label.component.vue';
import TemplateFieldSelectComponent from '@/components/admin/templates/template-field-select.component.vue';

export default {
    components: {
        TemplateFieldsetComponent,
        TemplateFieldLabelComponent,
        TemplateFieldSelectComponent,
    },
    computed: {
        ...mapGetters('managementCurriculums', ['curriculumSummariesList']),
        ...mapGetters('managementUsers/progressions/edition', [
            'userProgressionEditionCurriculumReference'
        ]),
        ...mapGetters('managementUsers/progressions/selection', [
            'userProgressionSelectionCurriculumReference'
        ]),
    },
    methods: {
        ...mapActions('managementUsers/progressions/edition', [
            'editUserProgressionEditionCurriculumReference'
        ])
    }
};
</script>

<style scoped></style>
