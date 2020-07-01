<template>
  <div id="playingSpeed">
    <progress id="progress-bar" :value="timeProgress" :max="maxPlayProgress"></progress>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PlayingSpeed",
  components: {},
  data() {
    return {
      counterUniqueIdentifier: 0,
      timeProgress: 0,
      timeStep: 100
    };
  },
  computed: {
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", ["timeoutInSeconds"]),
    playProgress() {
      return this.timeProgress;
    },
    maxPlayProgress() {
      return this.timeoutInSeconds * 1000;
    }
  },
  methods: {
    ...mapActions("piano", ["evaluateSpeedType"]),
    evaluate() {
      this.evaluateSpeedType();
    },
    countTimeStep() {
      this.timeProgress += this.timeStep;
    }
  },
  beforeMount() {},
  mounted() {
    // Start timer to count and limit time availble for playing
    this.counterUniqueIdentifier = window.setInterval(
      this.countTimeStep,
      this.timeStep
    );
  },
  beforeDestroy() {
    window.clearInterval(this.counterUniqueIdentifier);
  },
  destroyed() {},
  watch: {
    playProgress(value) {
      // When the time is over we indicate the end of the playing state
      if (value >= this.maxPlayProgress) {
        this.$emit('finishedPlaying');
      }
    }
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  max-height: 100%;
  width: auto;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* progress {
  -webkit-appearance: none;
} */

* {
  font-size: 1.6rem;
}
</style>
