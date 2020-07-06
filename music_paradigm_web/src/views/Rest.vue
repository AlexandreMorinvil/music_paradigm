<template>
  <div id="app">
    <p v-if="timeLeft > 0"> Time left : {{ timeLeft }} </p>
    <img id="instruction-img" :src="urlStatic(pictureName)" alt="Rest" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Rest",
  components: {},
  computed: {
    ...mapGetters(["urlStatic"]),
    ...mapState("piano", ["pressedKeys"]),
    ...mapGetters("experiment", ["pictureName", "timeoutInSeconds"])
  },
  data() {
    return {
      counterUniqueIdentifier: 0, // Unique Identifier of the countdown used for clean up
      timeLeft: 0,                // Time left to the countdown
      timeStep: 1                 // Timesteps of the countdown in seconds
    };
  },
  methods: {
    ...mapActions("experiment", ["goNextStep"]),
    countdownTime() {
      this.timeLeft -= this.timeStep;
    }
  },
  beforeMount() {},
  mounted() {
    // Starting the countdown of the maximum time for the rest
    if (this.timeoutInSeconds !== 0) {
      this.timeLeft = this.timeoutInSeconds;
      this.counterUniqueIdentifier = window.setInterval(
        this.countdownTime,
        this.timeStep * 1000
      );
    }
  },
  beforeDestroy() {
    window.clearInterval(this.counterUniqueIdentifier);
  },
  watch: {
    // press any piano keys to continue
    pressedKeys(array) {
      if (array.length > 0 && this.timeoutInSeconds === 0) {
        this.goNextStep();
      }
    },
    timeLeft(value) {
      if (value <= 0) {
        this.goNextStep();
      }
    }
  }
};
</script>

<style scoped>
img {
  max-height: 100%;
  width: auto;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
