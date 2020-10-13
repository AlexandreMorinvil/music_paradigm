<template>
  <div id="experiment" class="experiment-context experimen-grid">
    <div id="experiment-status">
      <div id="timer-box" class="status-display-box">
        <timer
          :startTimeInSeconds="timeLimitInSeconds"
          :mustCountDown="timeLimitInSeconds > 0"
          v-on:timesUp="handleTimesUp"
          ref="timer"
        />
      </div>

      <div id="center-wrapper">
        <div id="current-state-box" class="status-display-box wrapped-display">
          <svg id="icon-current-state" class="icon-state">
            <use :xlink:href="currentStateIcon" />
          </svg>
          {{ currentStateType }}
        </div>
        <div id="next-state-box" class="status-display-box wrapped-display">
          <svg id="icon-current-state" class="icon-state">
            <use :xlink:href="nextStateIcon" />
          </svg>
          {{ nextStateType }}
        </div>
      </div>

      <div id="piano-box" class="status-display-box">
        <piano :display="true" />
      </div>
    </div>

    <div id="experiment-progress-bar">
      <div id="experiment-progress" :style="`width: ${progressBarWith}%`"></div>
    </div>

    <div id="experiment-state">
      <router-view
        :lastPressedKey="lastPressedKey"
        :isSpaceBarPressed="isSpaceBarPressed"
        v-on:skipRequest="navigateExperimentSkip"
        v-on:experimentReady="displayFirstStep"
        v-on:stateEnded="navigateExperiment"
        v-on:experimentEnded="endExperiment"
      />
    </div>
  </div>
</template>

<script>
import ExperimentPiano from '@/components/ExperimentPiano.vue';
import ExperimentTimer from '@/components/ExperimentTimer.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Experiment',
  components: {
    piano: ExperimentPiano,
    timer: ExperimentTimer,
  },
  data() {
    return {
      isSpaceBarPressed: false,
      needsConfirmationToLeave: true,
      lastPressedKey: '',
    };
  },
  computed: {
    ...mapGetters('experiment', [
      'stepsTotalCount',
      'stepsLeftCount',
      'currentStateType',
      'nextStateType',
      'midiName',
      'timeLimitInSeconds',
    ]),
    currentStateIcon() {
      return this.getIconReference(this.currentStateType);
    },
    nextStateIcon() {
      return this.getIconReference(this.nextStateType);
    },
    progressBarWith() {
      return 100 * (1 - this.stepsLeftCount / this.stepsTotalCount);
    },
  },
  methods: {
    ...mapActions('experiment', [
      'updateState',
      'goNextStep',
      'goStepPostSkip',
      'clearState',
      'endExperimentByTimeout',
      'concludeExperiment',
    ]),
    ...mapActions('piano', ['loadMidiFile', 'resetPlayedNotesLogs', 'resetPianoState']),
    getIconReference(stateType) {
      const iconFileName = 'sprites.svg#';
      switch (stateType) {
        case 'cue':
          return iconFileName + 'icon-volume-high';
        case 'end':
          return iconFileName + 'icon-finish';
        case 'feedback':
          return iconFileName + 'icon-check-circle';
        case 'introduction':
          return iconFileName + 'icon-location';
        case 'instruction':
          return iconFileName + 'icon-info';
        case 'playing':
          return iconFileName + 'icon-piano';
        case 'rest':
          return iconFileName + 'icon-pause';
        case 'video':
          return iconFileName + 'icon-film';
        default:
          return iconFileName + 'icon-three-dots';
      }
    },
    handleTimesUp() {
      this.endExperimentByTimeout();
    },
    displayFirstStep() {
      this.updateState();
      this.$refs.timer.startTimer();
    },
    navigateExperiment() {
      this.resetPlayedNotesLogs();
      this.goNextStep();
    },
    navigateExperimentSkip() {
      this.resetPlayedNotesLogs();
      this.goStepPostSkip();
    },
    endExperiment() {
      this.needsConfirmationToLeave = false;
      this.concludeExperiment();
    },
    handleButtonPress(pressedKey) {
      if (pressedKey.key === ' ') this.isSpaceBarPressed = true;
      this.lastPressedKey = pressedKey.key.toLowerCase();
    },
    handleButtonRelease(releasedKey) {
      if (releasedKey.key === ' ') this.isSpaceBarPressed = false;
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleButtonPress);
    window.addEventListener('keyup', this.handleButtonRelease);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleButtonPress);
    window.removeEventListener('keyup', this.handleButtonRelease);
    this.resetPianoState();
    this.clearState();
  },
  watch: {
    midiName: {
      immediate: true,
      handler: function(midiName) {
        if (midiName !== '') this.loadMidiFile(this.midiName);
      },
    },
  },
  beforeRouteLeave(to, from, next) {
    // We need to verify that the route departure is not a redirection, otherwise
    // a confirmation will be prompted twice (Once before and after the redirection)
    if (this.needsConfirmationToLeave && !to.hasOwnProperty('redirectedFrom')) {
      const answer = window.confirm('Do you really want to leave the experiment in progress?');
      if (answer) next();
      else next(false);
    } else {
      next();
    }
  },
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
    'header' /* Status of the experiment */
    'progress' /* Progress bar of the experiment */
    'main'; /* State of the experiment */
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
  background-color: black;
  overflow: auto;
  margin: 25px;
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
.icon-state {
  display: inline-block;
  margin: 0 5px 0;
  min-height: 35px;
  min-width: 35px;
  width: 35px;
  height: 35px;
  stroke: rgb(220, 220, 220);
  fill: rgb(220, 220, 220);
}
</style>
