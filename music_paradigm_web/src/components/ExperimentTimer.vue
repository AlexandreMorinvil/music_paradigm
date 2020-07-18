<template>
  <div id="timer">
    <div id="timer-display" :class="color">
      <svg v-if="mustCountDown" class="timer-icon">
        <use xlink:href="sprites.svg#icon-hourglass" />
      </svg>
      <svg v-else class="timer-icon">
        <use xlink:href="sprites.svg#icon-timer" />
      </svg>
      &nbsp;{{timerDisplay}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Playing",
  props: {
    mustCountDown: {
      type: Boolean,
      default() {
        return false;
      }
    },
    startTimeInSeconds: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  components: {},
  data() {
    return {
      turnedOn: false,
      counterUniqueIdentifier: 0,
      timeStepInMilliseconds: 1000,
      referenceTime: 0,
      totalTime: 0,
      cumulatedTime: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0
    };
  },
  computed: {
    color() {
      return this.turnedOn ? "active" : "inactive";
    },
    timerDisplay() {
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
    setTime(value) {
      this.cumulatedTime = value * 1000;
      this.totalTime = this.cumulatedTime;
      this.referenceTime = new Date();
    },
    startTimer() {
      this.referenceTime = new Date();
      this.counterUniqueIdentifier = window.setInterval(
        this.updateTimer,
        this.timeStepInMilliseconds
      );
      this.updateTimer();
      this.turnedOn = true;
    },
    stopTimer() {
      window.clearInterval(this.counterUniqueIdentifier);
      this.cumulatedTime = this.updateTimer();
      this.turnedOn = false;
    },
    updateTimer() {
      this.mustCountDown ? this.countDown() : this.countUp();
      return this.totalTime;
    },
    countUp() {
      this.totalTime =
        this.cumulatedTime +
        Date.parse(new Date()) -
        Date.parse(this.referenceTime);
    },
    countDown() {
      this.totalTime =
        this.cumulatedTime -
        (Date.parse(new Date()) - Date.parse(this.referenceTime));
    }
  },
  beforeMount() {},

  mounted() {
    this.setTime(this.startTimeInSeconds);
    this.startTimer();
  },
  beforeDestroy() {
    window.clearInterval(this.counterUniqueIdentifier);
  },
  destroyed() {},
  watch: {
    totalTime(value) {
      if (value < 0) {
        this.setTime(0);
        this.stopTimer();
        this.$emit("timesUp");
      } else {
        this.seconds = Math.floor((value / 1000) % 60);
        this.minutes = Math.floor((value / 1000 / 60) % 60);
        this.hours = Math.floor((value / (1000 * 60 * 60)) % 24);
        this.days = Math.floor(value / (1000 * 60 * 60 * 24));
      }
    }
  }
};
</script>

<style scoped>
#timer-display {
  display: flex;
  align-items: center;
  height: 100%;
}
.timer-icon {
  display: inline-block;
  stroke-width: 0;
  width: 30px;
  height: 30px;
}
.active {
  stroke: rgb(220, 220, 220);
  fill: rgb(220, 220, 220);
  color: rgb(220, 220, 220);
}
.inactive {
  stroke: rgb(100, 100, 100);
  fill: rgb(100, 100, 100);
  color: rgb(100, 100, 100);
}
</style>
