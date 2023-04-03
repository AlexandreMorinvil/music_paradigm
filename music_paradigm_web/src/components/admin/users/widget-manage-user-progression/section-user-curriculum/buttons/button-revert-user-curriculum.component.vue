<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" isSmall color="turquoise" :isActive="isButtonActive"
        :isFrozen="isButtonFrozen" v-bind="$attrs" :text="text" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['isExecutingUserCommand']),
        ...mapGetters('managementUsers/progressions', ['hasEditedUserProgressionCurriculum']),
        ...mapGetters('managementUsers/progressions/selection', ['hasSelectedUserProgression']),
        isButtonFrozen() {
            return this.isExecutingUserCommand;
        },
        isButtonActive() {
            return this.hasEditedUserProgressionCurriculum;
        },
        text() {
            return this.hasSelectedUserProgression ? 'Revert Changes' : 'Clear';
        }
    },
    methods: {
        ...mapActions('managementUsers/progressions', ['revertUserProgressionEditions']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.revertUserProgressionEditions();
        },
    }
};
</script>

<style scoped></style>
