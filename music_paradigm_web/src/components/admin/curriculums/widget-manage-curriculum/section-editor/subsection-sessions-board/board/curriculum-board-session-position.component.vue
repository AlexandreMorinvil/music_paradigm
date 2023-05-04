<template>
    <div class="session-area">
        <CurriculumBoardPositionMarkerComponent v-if="canDisplayPositionMarkerBefore" :index="indexInCurriculum"
            :isBeforeSession="true" />
        <slot />
        <CurriculumBoardPositionMarkerComponent v-if="canDisplayPositionMarkerAfter" :index="indexInCurriculum"
            :isBeforeSession="false" :class="mustBeLastSessionOfDay && 'position-outside-day'" />
    </div>
</template>

<script>
import '@/styles/color-palette.css';

import { CurriculumDayWorkload } from '@/modules/curriculums';
import CurriculumBoardPositionMarkerComponent from './curriculum-board-position-marker.component.vue';

export default {
    components: {
        CurriculumBoardPositionMarkerComponent,
    },
    props: {
        dayWorkload: {
            type: CurriculumDayWorkload,
            default() {
                return new CurriculumDayWorkload();
            }
        },
        indexInDayWorkload: {
            type: Number,
            default() {
                return -1;
            }
        }
    },
    computed: {
        canDisplayPositionMarkerBefore() {
            return this.isFirstSessionOfCurriculum ||
                (this.isFirstSessionOfDay && this.isDayDelayedDueToUniqueInDay);
        },
        canDisplayPositionMarkerAfter() {
            return !(this.isLastSessionOfDay && this.isUniqueInDaySession) || this.isInLastDayOfCurriculum;
        },
        indexInCurriculum() {
            return this.dayWorkload.getSessionIndexInCurriculum(this.indexInDayWorkload);
        },
        isDayDelayedDueToUniqueInDay() {
            return this.dayWorkload.isDelayDueToUniqueInDay;
        },
        isFirstSessionOfCurriculum() {
            return this.indexInCurriculum === 0;
        },
        isFirstSessionOfDay() {
            return this.indexInDayWorkload === 0;
        },
        isLastSessionOfDay() {
            return this.dayWorkload.getLastSessionIndex() === this.indexInDayWorkload;
        },
        isUniqueInDaySession() {
            return this.dayWorkload.getSessionAtIndex(this.indexInDayWorkload).isUniqueInDay;
        },
        isInLastDayOfCurriculum() {
            return this.dayWorkload.isLastDayOfCurriculum;
        },
        mustBeLastSessionOfDay() {
            return this.isLastSessionOfDay && this.isUniqueInDaySession;
        }
    }
};
</script>

<style scoped>
.position-outside-day {
    position: absolute;
    right: -150px;
}

.session-area {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
