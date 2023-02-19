<template>
    <div class="englobing-box">
        <div class="board-context">
            <div class="board-inside-context content-flex">
                <CurriculumBoardDayComponent v-for="(dayWorkload, index) in curriculumDayWorloadList" :key="index"
                    :dayWorkload="dayWorkload" />
            </div>
        </div>
    </div>
</template>

<script>
import '@/styles/widget-template.css';
import { mapGetters } from 'vuex';

import { curriculumDailyWorkload } from '@/modules/curriculums';
import CurriculumBoardDayComponent from './curriculum-board-day.component.vue';

export default {
    components: {
        CurriculumBoardDayComponent
    },
    data() {
        return {
            curriculumDayWorloadList: [],
        }
    },
    computed: {
        ...mapGetters('managementCurriculums/edition', [
            'curriculumEditionCurriculum',
        ]),
    },
    methods: {
        updateBoard() {
            this.curriculumDayWorloadList = curriculumDailyWorkload.generateCurriculumDayWorkloadList(
                this.curriculumEditionCurriculum
            );
            this.$forceUpdate();
        }
    },
    watch: {
        curriculumEditionCurriculum: {
            deep: true,
            immediate: true,
            handler: function () {
                this.updateBoard();
            }
        },
    }
};
</script>

<style scoped>
.englobing-box {
    display: grid;
    grid-template-rows: auto;
    color: rgb(230, 230, 230);
}

.board-context {
    padding: 20px;
    background-color: rgb(80, 80, 80);
    border: 5px rgb(75, 75, 75) solid;
    box-shadow: 5px 5px 8px black;
    z-index: 1;
}

.board-inside-context {
    border: 5px rgb(75, 75, 75) solid;
    background-color: rgb(35, 35, 35);
    box-shadow: 0 0 25px rgb(15, 15, 15) inset;
}

.content-flex {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.highlighted-session {
    background-color: rgba(100, 200, 50, 0.25);
    box-shadow: 0 0px 10px rgba(100, 200, 50, 0.5);
    border-radius: 10px;
}

.highlighted-session>* {
    box-shadow: none !important;
}
</style>
