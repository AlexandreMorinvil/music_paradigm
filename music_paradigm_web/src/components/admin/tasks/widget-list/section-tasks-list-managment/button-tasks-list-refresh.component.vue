<template>
    <button v-on:click="handleRefresh" :class="isListLoading && 'inactive'" class="widget-button blue">Refresh</button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('experiments', ['isFetchingExperimentHeadersList']),
        isListLoading() {
            return this.isFetchingExperimentHeadersList;
        },
    },
    methods: {
        ...mapActions('experiments', ['fetchAllExperimentsHeaders']),
        handleRefresh() {
            if (this.isListLoading) return;
            this.fetchAllExperimentsHeaders();
        },
    }
};
</script>

<style scoped>

</style>
