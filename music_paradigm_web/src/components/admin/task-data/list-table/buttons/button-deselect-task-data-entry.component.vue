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
        userId: {
            type: null,
            default: null,
        }
    },
    computed: {
        ...mapGetters('managementUsers', [
            'isExecutingUserCommand'
        ]),
        ...mapGetters('managementUsers/selection', [
            'hasSelectedUser',
            'userSelectionId',
        ]),
        isButtonFrozen() {
            return this.isExecutingUserCommand;
        },
        isButtonActive() {
            return this.userIdParameter ? this.isSelected : this.hasSelectedUser;
        },
        userIdParameter() {
            return this.entity?._id || this.userId || null;
        },
        isSelected() {
            return this.userIdParameter === this.userSelectionId;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['unsetSelectedUser']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.unsetSelectedUser();
        },
    }
};
</script>

<style scoped></style>
