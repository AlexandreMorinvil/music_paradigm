<template>
    <div :class="isSessionLinkedToSelectedSession && 'highlighted-session'">
        <div class="session-container" :class="{
            'session-container-shadow': !isSessionLinkedToSelectedSession,
            'session-with-issue': hasIssue,
            'selected-session': isSelectedSession
        }" v-on:click="handleSessionClick">
            <div>
                <div>{{ title }}</div>
                <div class="session-task">{{ taskName }}</div>
            </div>
            <div class="session-specifications">
                <b>Delay : </b>
                <span>{{ delayInDays }} day(s)</span>

                <b>Wait a day after : </b>
                <span>{{ isUniqueInDayText }}</span>

                <b>Completion limit : </b>
                <span>{{ isCompletionLitmitedText }}</span>

                <b>Has text : </b>
                <span>{{ hasTextIndicator }}</span>
            </div>
            <div class="associative-id-contanier-box"><b>Ass. ID:</b> {{ completeAssociativeId }}</div>
        </div>
    </div>
</template>

<script>
import '@/styles/color-palette.css';

import { curriculumGenerator, curriculumSessionValidator } from '@/modules/curriculums';
import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        curriculumSession: {
            type: Object,
            default() {
                return curriculumGenerator.GENERATE_BLANK_CURRICULUM_SESSION();
            }
        },
        index: {
            type: Number,
            default() {
                return -1;
            }
        }
    },
    computed: {
        ...mapGetters('experiments', ['taskHeaderForReference']),
        ...mapGetters('managementCurriculums/edition', [
            'curriculumEditionSessionAssociativeId',
            'curriculumEditionSelectedSessionIndex',
        ]),
        completeAssociativeId() {
            return `${this.curriculumSession.associativeId} / ${this.curriculumSession.associativeIdOrdinalNumber}`;
        },

        delayInDays() {
            return Number(this.curriculumSession.delayInDays);
        },

        experimentReference() {
            return this.curriculumSession.experimentReference;
        },

        hasTextIndicator() {
            return Boolean(this.curriculumSession.text) ? "Yes" : "No";
        },

        hasIssue() {
            return !curriculumSessionValidator.isCurriculumSessionValid(this.curriculumSession);
        },

        isUniqueInDayText() {
            return this.curriculumSession.isUniqueInDay ? "✓" : "";
        },

        isCompletionLitmitedText() {
            return this.curriculumSession.isCompletionLimited ? "✓" : "";;
        },

        isSelectedSession() {
            return this.curriculumEditionSelectedSessionIndex === this.index;
        },

        isSessionLinkedToSelectedSession() {
            return this.curriculumSession.associativeId === this.curriculumEditionSessionAssociativeId;
        },

        releaseTime() {
            return this.curriculumSession.releaseTime || 0;
        },

        taskName() {
            const taskReference = this.curriculumSession.experimentReference;
            const taskHeader = this.taskHeaderForReference(taskReference);
            if (taskHeader) return `${taskHeader.group}/${taskHeader.name}/[v]${taskHeader.version}`;
            else return "#NO TASK";
        },

        title() {
            const title = this.curriculumSession.title || "";
            return title.length > 0 ? title : "#NO TITLE";
        },
    },
    methods: {
        ...mapActions('managementCurriculums/edition', [
            'setCurriculumEditionSelectedSessionIndex',
            'unsetCurriculumEditionSelectedSessionIndex',
        ]),
        handleSessionClick() {
            if (this.isSelectedSession) this.unsetCurriculumEditionSelectedSessionIndex();
            else this.setCurriculumEditionSelectedSessionIndex(this.index);
        }
    }
};
</script>

<style scoped>
.session-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    width: 200px;
    height: 200px;
    margin: 10px;
    background-color: gray;
    border-style: solid;
    border-radius: 10px;
    border-width: 4px;
    text-align: center;
    padding: 10px;
    background-color: var(--color-blue-board-item-background);
    border-color: var(--color-blue-board-item-border);
    color: rgb(240, 240, 240);
    fill: var(--color-blue-board-item-stroke);
    cursor: pointer;
}

.session-container-shadow {
    box-shadow: 5px 5px 5px rgb(15, 15, 15);
}

.session-task {
    font-size: 0.7em;
}

.session-specifications {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 4px;
    font-size: 0.625em;
    text-align: left;
}

.associative-id-contanier-box {
    position: absolute;
    display: inline;
    padding: 1px;
    width: auto;
    bottom: -20px;
    left: -10px;
    border-width: 3px;
    border-style: solid;
    background-color: var(--color-green-board-tag-background);
    border-color: var(--color-green-board-tag-border);
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.7em;
    box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.1);
}

.highlighted-session {
    background-color: rgba(109, 217, 54, 0.25);
    box-shadow: 0 0px 10px rgba(112, 223, 57, 0.5);
    border-radius: 10px;
}
.session-with-issue {
    background-color: var(--color-red-board-item-background);
    border-color: var(--color-red-board-item-border);
}

.selected-session {
    background-color: var(--color-green-board-item-background);
    border-color: var(--color-green-board-item-border);
    color: white;
}
.selected-session.session-with-issue {
    background-color: var(--color-yellow-board-item-background);
    border-color: var(--color-yellow-board-item-border);
}
</style>
