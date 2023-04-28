<template>
    <TemplateFieldsetComponent>
        <TemplateFieldLabelComponent text="Curriculum" />
        <TemplateFieldSelectComponent 
            :value="userProgressionEditionCurriculumReference"
            :expectedValue="userProgressionSelectionCurriculumReference"
            v-on:edit="editUserProgressionEditionCurriculumReference"
            isEmptyAccepted
            :isLoading="isFetchingCurriculumSummariesList"
            :getDisplayedValueFromElement="(curriculumSummary) => curriculumSummary.title"
            :getOptionValueFromElement="(curriculumSummary) => curriculumSummary._id" :options="curriculumSummariesList"
            placeholder="# No Curriculum" />
    </TemplateFieldsetComponent>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import TemplateFieldsetComponent from '@/components/admin/template/template-fieldset.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/template/template-field-label.component.vue';
import TemplateFieldSelectComponent from '@/components/admin/template/template-field-select.component.vue';

export default {
    components: {
        TemplateFieldsetComponent,
        TemplateFieldLabelComponent,
        TemplateFieldSelectComponent,
    },
    computed: {
        ...mapGetters('managementCurriculums', [
            'curriculumSummariesList',
            'isFetchingCurriculumSummariesList',
        ]),
        ...mapGetters('managementUsers/progressions/edition', [
            'userProgressionEditionCurriculumReference'
        ]),
        ...mapGetters('managementUsers/progressions/selection', [
            'userProgressionSelectionCurriculumReference'
        ]),
    },
    methods: {
        ...mapActions('managementCurriculums', [
            'fetchCurriculumSummariesList'
        ]),
        ...mapActions('managementUsers/progressions/edition', [
            'editUserProgressionEditionCurriculumReference'
        ])
    },
    beforeMount() {
        this.fetchCurriculumSummariesList();
    },
};
</script>

<style scoped></style>
