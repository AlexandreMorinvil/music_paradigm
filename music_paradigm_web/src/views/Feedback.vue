<template>
  <div id="app">
    <img
      class="feedback-img-ww"
      id="ww"
      :src='apiUrl+"/static/feedback/"+status+".jpg"'
      alt="Feedback"
    />
    <!-- <img class='feedback-img-ww' id='ww' v-if="status == 'ww'" src="@/assets/feedback/ww.jpg" alt="Feedback"/>
    <img class='feedback-img' id='ws' v-else-if="status == 'ws'" src="@/assets/feedback/ws.jpg" alt="Feedback"/>
    <img class='feedback-img' id='sw' v-else-if="status == 'sw'" src="@/assets/feedback/sw.jpg" alt="Feedback"/>
    <img class='feedback-img' id='ss' v-else src="@/assets/feedback/ss.jpg" alt="Feedback"/>-->
    <p>Press space bar to exit</p>
    <!-- <p><router-link to="/">Logout</router-link></p> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import config from "@/config";

export default {
  name: "Feedback",
  components: {},
  data() {
    return {
      apiUrl: config.apiUrl,
      status: "ss"
    };
  },
  computed: {
    ...mapState(["starteds"]),
    ...mapState("experiment", ["experiment"])
  },
  methods: {
    ...mapActions("experiment", ["goNextStep"])
  },
  mounted() {
    // TODO: See if this piece of logic concerning the feedback belongs to here
    // this.feedbackStatus = pitchAcc === 100 ? "s" : "w";
    // this.feedbackStatus += rhythmDiff <= config.maxRhythmError ? "s" : "w";

    this.status = this.experiment.feedbackStatus ? this.experiment.feedbackStatus : "ww";
  },
  watch: {
    starteds(array) {
      // TODO: Break the loop if all good and if new parameter "continueOnSuccess" is true (true by default)

      // const current = this.experiment.flow[this.experiment.nextFlowIndex];
      if (array.length > 0) {
        this.goNextStep();
      }
    }
  },
};
</script>

<style scoped>
div {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

img {
  max-height: 100%;
  width: auto;
}
</style>
