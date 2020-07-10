<template>
  <div id="timer">{{timerDisplay}}</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Playing",
  components: {},
  data() {
    return {
      cumulatedTime: 0,
      counterUniqueIdentifier: 0,
      timeStepInMilliseconds: 1000,
      startTime: 0,
      total: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0
    };
  },
  computed: {
    timerDisplay() {
      //return  `${this.minutes}:${this.seconds}`;
      let hours = "";
      if (this.hours > 0)
        hours = (this.hours < 10 ? "0" + this.hours : this.hours) + ":";
      return (
        hours +
        (this.minutes < 10 ? "0" + this.minutes : this.minutes) +
        ":" +
        (this.seconds < 10 ? "0" + this.seconds : this.seconds)
      );
    }
  },
  methods: {
    startTimer() {
      this.startTime = new Date();
      this.counterUniqueIdentifier = window.setInterval(
        this.updateTimer,
        this.timeStepInMilliseconds
      );
    },
    stopTimer() {
      window.clearInterval(this.counterUniqueIdentifier);
      this.updateTimer();
      this.cumulatedTime =
        Date.parse(new Date()) -
        Date.parse(this.startTime) +
        this.cumulatedTime;
    },
    updateTimer() {
      this.total =
        Date.parse(new Date()) -
        Date.parse(this.startTime) +
        this.cumulatedTime;
      this.seconds = Math.floor((this.total / 1000) % 60);
      this.minutes = Math.floor((this.total / 1000 / 60) % 60);
      this.hours = Math.floor((this.total / (1000 * 60 * 60)) % 24);
      this.days = Math.floor(this.total / (1000 * 60 * 60 * 24));
    }
  },
  beforeMount() {},
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    window.clearInterval(this.counterUniqueIdentifier);
  },
  destroyed() {},
  watch: {}
};
</script>

<style scoped>
</style>
