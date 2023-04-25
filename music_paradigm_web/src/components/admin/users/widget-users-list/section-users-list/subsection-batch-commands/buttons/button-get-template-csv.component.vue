<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive" :isLoading="isLoading"
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
    computed: {
        ...mapGetters('managementUsers/batchCommand', [
            'isGettingUsersCreationTemplateCsv',
            'usersBatchCommandCurriculum',
        ]),
        isLoading() {
            return this.isGettingUsersCreationTemplateCsv;
        },
        isButtonFrozen() {
            return false;
        },
        isButtonActive() {
            return true;
        },
        text() {
            return 'Get template csv';
        },
    },
    methods: {
        ...mapActions('managementUsers/batchCommand', ['getUsersCreationTemplateCsv']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.getUsersCreationTemplateCsv({
                curriculum: this.usersBatchCommandCurriculum,
            });
        },
    }
};
</script>

<style scoped></style>
