<template>
    <TemplateFieldsetComponent>
        <TemplateFieldLabelComponent text="Curriculum" />
        <TemplateFieldSelectComponent 

        isEmptyAccepted
            :getDisplayedValueFromElement="(curriculumSummary) => curriculumSummary.title"
            :getOptionValueFromElement="(curriculumSummary) => curriculumSummary._id" :options="curriculumSummariesList"
            placeholder="# No Curriculum" />
    </TemplateFieldsetComponent>
</template>

<script>

import { mapGetters } from 'vuex';

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
    },
    methods: {
        getCurriculumTitleFromId(id) {
            const curriculum = this.curriculumsList.find((obj) => {
                return obj._id === id;
            });
            if (curriculum[0]) return curriculum[0].title;
            else return '';
        },
    }
};
</script>

<style scoped></style>
