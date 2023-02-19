<template>
    <div class="position-placeholder-container" v-if="shouldDisplay" v-on:click="handlePositionClick">
        <b>
            {{ placeHolderIcon }}
        </b>
    </div>
</template>

<script>
import '@/styles/color-palette.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        index: {
            type: Number,
            default() {
                return -1;
            }
        },
        isBeforeSession: {
            type: Boolean,
            default() {
                return true;
            }
        },
    },
    computed: {
        ...mapGetters('managementCurriculums/edition', [
            'isInCurriculumEditionSessionAdditionMode',
            'needsCurriculumEditionSessionPositionMakers',
        ]),
        shouldDisplay() {
            return this.needsCurriculumEditionSessionPositionMakers;
        },
        placeHolderIcon() {
            if (this.isInCurriculumEditionSessionAdditionMode) return '+';
        },
    },
    methods: {
        ...mapActions('managementCurriculums/edition', ['addCurriculumEditionSession']),
        handlePositionClick() {
            if (this.isInCurriculumEditionSessionAdditionMode)
                this.addCurriculumEditionSession({
                    indexPosition: this.index,
                    isAddedBefore: this.isBeforeSession,
                });
        }
    }
};
</script>

<style scoped>
.position-placeholder-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100px;
    height: 100px;
    margin: 10px;
    background-color: gray;
    border-style: solid;
    border-radius: 10px;
    border-width: 4px;
    text-align: center;
    padding: 10px;
    font-size: 2em;
    background-color: var(--color-light-grey-board-item-background);
    border-color: var(--color-light-grey-board-item-border);
    color: rgb(220, 220, 220);
    fill: var(--color-blue-board-item-stroke);
}
</style>
