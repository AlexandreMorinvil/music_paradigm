<template>
    <div class="widget-table-context">
        <loader v-if="isListLoading" class="loader"></loader>
        <table v-else class="widget-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Group</th>
                    <th>Name</th>
                    <th>Version</th>
                    <th>Resource Folder</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(experimentSummary, index) in experimentsHeadersList" :key="experimentSummary._id"
                    :class="isSelectedExperiment(experimentSummary) && 'selected'">
                    <td>{{ index + 1 }}</td>
                    <td>{{ makeGroupDisplay(experimentSummary) }}</td>
                    <td>{{ makeNameDisplay(experimentSummary) }}</td>
                    <td>{{ makeVersionDisplay(experimentSummary) }}</td>
                    <td>{{ makeFolderDisplay(experimentSummary) }}</td>
                    <td class="widget-table-actions-buttons">
                        <button v-on:click="handleSelectExperiment(experimentSummary)" class="widget-button small"
                            :class="isSelectedExperiment(experimentSummary) ? 'turquoise' : 'blue'">
                            {{ makeSelectButtonText(experimentSummary) }}
                        </button>
                        <button v-on:click="handleSelectToEditor(experimentSummary)"
                            class="widget-button small orange">Edit</button>
                        <button v-on:click="handleStart(experimentSummary)"
                            class="widget-button small green">Run</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';
import LoaderCircular from '@/components/visual-helpers/loader-circular.component.vue';

export default {
    components: {
        loader: LoaderCircular,
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters('experiments', ['isFetchingExperimentHeadersList', 'experimentsHeadersList', 'selectedId']),
        isListLoading() {
            return this.isFetchingExperimentHeadersList;
        },
    },
    methods: {
        ...mapActions('experiments', [
            'fetchAllExperimentsHeaders',
            'setEditorExperiment',
            'setSelectionExperiment',
            'unsetSelectionExperiment',
            'startExperimentQuick',
        ]),
        handleSelectToEditor(experimentSummary) {
            this.setEditorExperiment(experimentSummary._id);
        },
        handleSelectExperiment(experimentSummary) {
            if (this.isSelectedExperiment(experimentSummary)) this.unsetSelectionExperiment();
            else this.setSelectionExperiment(experimentSummary._id);
        },
        handleStart(experimentSummary) {
            this.startExperimentQuick(experimentSummary._id);
        },
        makeGroupDisplay(experimentSummary) {
            return experimentSummary.group;
        },
        makeNameDisplay(experimentSummary) {
            return experimentSummary.name;
        },
        makeVersionDisplay(experimentSummary) {
            return experimentSummary.version;
        },
        makeFolderDisplay(experimentSummary) {
            return experimentSummary.folder;
        },
        makeSelectButtonText(experimentSummary) {
            return this.isSelectedExperiment(experimentSummary) ? 'Deselect' : 'Select';
        },
        isSelectedExperiment(experimentSummary) {
            return experimentSummary && experimentSummary._id === this.selectedId;
        },
    },
    mounted() {
        this.fetchAllExperimentsHeaders();
    },
};
</script>

<style scoped>
.loader {
    width: 500px;
    height: 500px;
}
</style>
