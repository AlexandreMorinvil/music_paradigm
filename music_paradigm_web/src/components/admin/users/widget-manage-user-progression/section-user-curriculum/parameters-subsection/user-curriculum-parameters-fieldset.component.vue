<template>
    <TemplateFieldsetComponent>
        <template v-for="parameter in userProgressionEditionCurriculumParameters">
            <TemplateFieldLabelComponent :text="parameter.name" />
            <TemplateFieldSelectComponent
                :value="userProgressionEditionAssignedParameters[parameter.name]"
                :expectedValue="getExpectedValue(parameter.name)"
                :isEmptyAccepted="true"
                :isEveryValueNew="!hasSelectedUserProgression"
                v-on:edit="(value) => editAssignedParameterValue(parameter.name, value) " 
                :options="parameter.optionValuesList"
                placeholder="TASK DEPENDANT DEFAULT"
                :selectAttributes="{ name: `parameter-${parameter.name}` }"
            />
        </template>
    </TemplateFieldsetComponent>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';

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
            'userProgressionEditionCurriculumParameters', 
            'userProgressionEditionAssignedParameters'
        ]),
        ...mapGetters('managementUsers/progressions/selection', [
            'hasSelectedUserProgression',
            'userProgressionSelectionAssignedParameters'
        ]),
    },
    methods: {
        ...mapMutations('managementUsers/progressions/edition', [
            'editUserProgressionEditionAssignedParameterValue'
        ]),
        editAssignedParameterValue(parameterName, value) {
            this.editUserProgressionEditionAssignedParameterValue({ parameterName, value });
            // This is used to assure the reactivity of on the "assigned parameters". "assignedParameters" is an
            // object that maps the parameter name to its value, however, initially, some parameter names may not be
            // defined on the objects and would only be defined when the object is edited for a first time. Those 
            // initially not defined parameter names would not update properly unless we force update the component.
            this.$forceUpdate(); 
        },
        getExpectedValue(parameterName) {
            // We transform the undefined values into null values since the TemplateFieldSelectComponent can expect
            // a null, but not an undefined. (Morever, it is possible for assinged parameters to not be defined if
            // no specific value is assinged)
            const expectedValue = this.userProgressionSelectionAssignedParameters[parameterName];
            return (expectedValue === undefined) ? null : expectedValue;
        }
    }
};
</script>

<style scoped></style>
