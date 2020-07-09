<template>
  <div id="experiment" class="experiment-context experimen-grid">
    <div id="experiment-status">
      <div id="timer-box" class="status-display-box">
        <timer />
      </div>

      <div id="center-wrapper">
        <div id="current-state-box" class="status-display-box wrapped-display">State</div>
        <div id="next-state-box" class="status-display-box wrapped-display">Next</div>
      </div>

      <div id="piano-box" class="status-display-box">
        Piano status
        <piano />
      </div>
    </div>

    <div id="experiment-progress-bar">
      <div id="experiment-progress"></div>
    </div>

    <div id="experiment-state">
      <router-view class="centered" />
    </div>
  </div>
</template>

<script>
import ThePianoVue from "@/components/ThePiano.vue";
import ExperimentPiano from "@/components/ExperimentTimer.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Experiment",
  components: {
    piano: ThePianoVue,
    timer: ExperimentPiano
  },
  data() {
    return {
      appInited: false
    };
  },
  computed: {
    ...mapState("experiment", ["experimentName", "experimentSet"]),
    ...mapGetters("experiment", [])
  },
  methods: {
    ...mapActions(["setApplicationInitialization"])
  },
  mounted() {},
  watch: {
    experimentSet() {
      if (this.experimentSet && !this.appInited) {
        this.setApplicationInitialization(true);
        this.appInited = true;
      }
    }
  }
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
  background-color: rgb(0, 0, 0);
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