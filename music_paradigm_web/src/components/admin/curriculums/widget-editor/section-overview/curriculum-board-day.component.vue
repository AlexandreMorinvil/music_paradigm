<template>
    <div class="curriculum-day-container" :class="mustMakeSpaceForPositionAfterDay && 'margin-after-day'">
        <div class="curriculum-day-label">
            <div class="label-text"> <b> {{ delayText }} </b></div>
            <div v-if="isDelayDueToUniqueInDay" class="label-precision"> {{ isDelayDueToUniqueInDayText }} </div>
        </div>
        <CurriculumBoardSessionPositionComponent v-for="(curriculumSession, index) in curriculumSessionsList" :key="index"
            class="session-area" :dayWorkload="dayWorkload" :indexInDayWorkload="index">
            <CurriculumBoardSessionComponent :curriculumSession="curriculumSession" :index="getSessionIndex(index)" />
        </CurriculumBoardSessionPositionComponent>
    </div>
</template>

<script>
import '@/styles/color-palette.css';

import { CurriculumDayWorkload } from '@/modules/curriculums';
import CurriculumBoardSessionComponent from './curriculum-board-session.component.vue';
import CurriculumBoardSessionPositionComponent from './curriculum-board-session-position.component.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        CurriculumBoardSessionPositionComponent,
        CurriculumBoardSessionComponent,
    },
    props: {
        dayWorkload: {
            type: CurriculumDayWorkload,
            default() {
                return new CurriculumDayWorkload();
            }
        }
    },
    computed: {
        ...mapGetters('managementCurriculums/edition', [
            'needsCurriculumEditionSessionPositionMakers',
        ]),
        curriculumSessionsList() {
            return this.dayWorkload.sessionsList;
        },
        delayText() {
            const delayInDays = Number(this.dayWorkload.delayInDays);
            if (delayInDays === 0) return 'First day';
            else if (delayInDays === 1) return 'After 1 day';
            else if (delayInDays > 1) return `After ${delayInDays} days`;
        },
        isDelayDueToUniqueInDay() {
            return this.dayWorkload.isDelayDueToUniqueInDay;
        },
        isDelayDueToUniqueInDayText() {
            return 'Previous session requires waiting next day';
        },
        isLastDayOfCurriculum() {
            return this.dayWorkload.isLastDayOfCurriculum;
        },
        isLastSessionUniqueInDay() {
            return this.dayWorkload.isLastSessionUniqueInDay();
        },
        mustMakeSpaceForPositionAfterDay() {
            return this.needsCurriculumEditionSessionPositionMakers &&
                this.isLastDayOfCurriculum &&
                this.isLastSessionUniqueInDay;
        }
    },
    methods: {
        getSessionIndex(index) {
            return this.dayWorkload.getSessionIndexInCurriculum(index);
        },
    }
};
</script>

<style scoped>
.curriculum-day-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    background-color: var(--color-blue-board-tag-background);
    border-color: var(--color-blue-board-tag-border);
    border-radius: 5px;
    border-style: solid;
    border-width: 4px;
    margin: 10px;
    padding: 20px 10px 10px;
    box-shadow: 5px 5px 5px rgb(15, 15, 15);
}

.curriculum-day-label {
    display: inline;
    position: absolute;
    left: -15px;
    top: -25px;
    padding: 5px;
    width: auto;
    background-color: var(--color-turquoise-board-tag-background);
    border-color: var(--color-turquoise-board-tag-border);
    border-style: solid;
    border-width: 3px;
    box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.85);
}

.label-text {
    font-size: 0.8em;
}

.label-precision {
    font-size: 0.5em;
}

.margin-after-day {
    margin-right: 175px;
}
</style>
