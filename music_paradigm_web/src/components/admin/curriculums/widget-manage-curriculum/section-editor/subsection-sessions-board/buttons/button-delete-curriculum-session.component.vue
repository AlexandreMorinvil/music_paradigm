<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="red" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Delete selected session" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementCurriculums', ['isExecutingCurriculumCommand']),
        ...mapGetters('managementCurriculums/edition', [
            'hasCurriculumEditionSelectedSession',
            'hasMoreThanOneSessionInCurriculumEdition',
        ]),
        isButtonFrozen() {
            return false;
        },
        isButtonActive() {
            if (this.isExecutingCurriculumCommand) return false;
            return this.hasCurriculumEditionSelectedSession && this.hasMoreThanOneSessionInCurriculumEdition;
        },
        isButtonLoading() {
            return false;
        },
    },
    methods: {
        ...mapActions('managementCurriculums/edition', ['removeCurriculumEditionSession']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.removeCurriculumEditionSession();
        },
    }
};
</script>

<style scoped></style>
