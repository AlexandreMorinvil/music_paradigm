<template>
    <button v-on:click="handleDownload" class="widget-button blue" :class="isButtonActive || 'inactive'">
        Download tasks as ZIP file
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('experiments', ['hasTaskInTasksHeadersList', 'isDownloadingTasksZipFile']),
        isButtonActive() {
            return !this.isDownloadingTasksZipFile && this.hasTaskInTasksHeadersList;
        },
    },
    methods: {
        ...mapActions('experiments', ['downloadTasksZipFile']),
        handleDownload() {
            if (!this.isButtonActive) return;
            this.downloadTasksZipFile();
        },
    }
};
</script>

<style scoped>

</style>
