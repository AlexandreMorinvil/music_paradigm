<template>
  <div id="experiment" class="experiment-context experimen-grid">
    <div id="experiment-status">
      <div id="timer-box" class="status-display-box">
        <timer />
      </div>

      <div id="center-wrapper">
        <div
          id="current-state-box"
          class="status-display-box wrapped-display"
        >{{ currentStateType }}</div>
        <div id="next-state-box" class="status-display-box wrapped-display">{{ nextStateType }}</div>
      </div>

      <div id="piano-box" class="status-display-box">
        <piano :display="true" />
      </div>
    </div>

    <div id="experiment-progress-bar">
      <div id="experiment-progress" :style="`width: ${progressBarWith}%`"></div>
    </div>

    <div id="experiment-state">
      <router-view class="centered" />
      {{ progressBarWith }};
    </div>
  </div>
</template>

<script>
import ExperimentPiano from "@/components/ExperimentPiano.vue";
import ExperimentTimer from "@/components/ExperimentTimer.vue";
import { mapGetters } from "vuex";

export default {
  name: "Experiment",
  components: {
    piano: ExperimentPiano,
    timer: ExperimentTimer
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("experiment", [
      "stepsTotalCount",
      "stepsLeftCount",
      "currentStateType",
      "nextStateType"
    ]),
    progressBarWith() {
      return 100 * (1 - this.stepsLeftCount / this.stepsTotalCount);
    }
  },
  methods: {},
  mounted() {},
  watch: {}
};
</script>


<style>
#experiment {
  height: 100%;
  background-color: rgb(15, 15, 15);
}
.experiment-header-position {
  grid-area: header;
}
.experiment-progress-position {
  grid-area: progress;
}
.experiment-main-position {
  grid-area: main;
}
.experimen-grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 64px 10px;
  grid-template-areas:
    "header" /* Status of the experiment */
    "progress" /* Progress bar of the experiment */
    "main"; /* State of the experiment */
  grid-gap: 0px;
}
#experiment-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(30, 30, 30);
}
#experiment-progress-bar {
  background-color: rgb(20, 20, 20);
  border-bottom-color: rgb(15, 15, 15);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  height: inherit;
}
#experiment-progress {
  background-color: rgb(0, 100, 255);
  height: inherit;
  width: 50%;
}
#experiment-state {
  box-shadow: 0 0 25px 0 rgb(0, 0, 0);
  background-color: rgb(248, 135, 135);
  margin: 25px;
  min-height: 400px;
}
.status-display-box {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  overflow: hidden;

  border-radius: 5px;
  border-color: rgb(35, 35, 35);
  border-width: 0 2px 0;
  border-style: solid;

  background-color: rgb(15, 15, 15);
  color: rgb(220, 220, 220);

  height: 85%;
  width: 15%;
  min-width: 100px;
  padding: 0 20px 0;
  margin: 0 10px 0;

  font-size: 25px;
  line-height: 0.7;
}
#center-wrapper {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  height: 100%;
  width: 50%;
}
.wrapped-display {
  width: 30%;
}
</style>