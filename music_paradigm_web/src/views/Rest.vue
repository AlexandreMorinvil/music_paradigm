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
    ...mapState("piano", ["starteds"]),
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
    ...mapActions("experiment", ["initState", "onNext"]),
    countdownTime() {
      this.timeLeft -= this.timeStep;
    }
  },
  beforeMount() {
    this.initState();
  },
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
    starteds(array) {
      if (array.length > 0 && this.timeoutInSeconds === 0) {
        this.onNext();
      }
    },
    timeLeft(value) {
      if (value <= 0) {
        this.onNext();
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
