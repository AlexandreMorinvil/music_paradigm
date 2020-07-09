<template>
  <div id="experiment" class="experiment-context experimen-grid">
    <div id="experiment-status">
      <div>
        <p> Time </p>
      </div>
      <div>
        <p> Back </p>
      </div>
      <div>
        <p> State </p>
      </div>
      <div>
        <p> Next </p>
      </div>
      <div>
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
import { mapState, mapActions } from "vuex";

export default {
  name: "Experiment",
  components: {
    piano: ThePianoVue
  },
  data() {
    return {
      appInited: false
    };
  },
  computed: {
    ...mapState("experiment", ["experimentSet"])
  },
  methods: {
    ...mapActions(["setApplicationInitialization"])
  },
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
#experiment-status > div {
  background-color: black;
  margin: 10px;
  padding: 0px;
  font-size: 30px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>