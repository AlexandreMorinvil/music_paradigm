<template>
  <div id="app">
    <img id='playing-img' :src="apiUrl+'/static/'+picName" alt="Playing" onerror="this.hidden=true"/>
    <progress id="progress-bar" :value="playProgress" max="100" :style="customStyle"></progress>
    <!-- <meter id="progress-bar" :value="playProgress" max="100" style="width:500px"></meter> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import config from '@/config';
import performanceEvaluation from '@/_helpers/performanceEvaluation.js'

export default {
  name: 'Playing',
  components: {
  },
  data() {
    return {
      apiUrl: config.apiUrl,
      picName: "",
      customStyle: "",

      current: {},
      mainTimeOut: null,
    }
  },
  computed: {
    ...mapState('account', ['user']),
    ...mapState([
      'songNotes',
      'songDurations',
      'playedNotes',
      'playedDurations',
      'playedOffsets',
      'playedVelocities',

      'experiment'
    ]),
    playProgress() {
      if (this.songNotes.length === 0) return 100;

      // let tempProgress = this.playedNotes.length / this.songNotes.length;
      // tempProgress = Number.isInteger(tempProgress) && tempProgress !== 0? 1: tempProgress - Math.floor(tempProgress);
      // return tempProgress * 100;

      let tempProgress = 0;
      switch(this.experiment.mode){
        case 'speed' :
          tempProgress = this.playedNotes.length / (this.songNotes.length * 50);
          // tempProgress = 100;
          // this.customStyle=`width:${this.playedNotes.length * 10}px`;
          // console.log(this.customStyle);
          break;

        case 'rhythm' :
          tempProgress = this.playedNotes.length / this.songNotes.length;
          break;
      }
      return tempProgress * 100;
    },
  },
  methods: {
    ...mapActions('results', ['create']),
    ...mapActions('account', {updateUser: 'update'}),
    ...mapActions([
      'setPlayedNotes',
      'setPlayedDurations',
      'setPlayedOffsets',
      'setPlayedVelocities',

      'initState'
    ]),
    ...mapActions({expOnNext: 'onNext'}),
    onNext() {
      this.expOnNext();
      this.picName = this.experiment.picName;
      this.getMetricAndLog();
    },
    getMetricAndLog() {
      // console.log(this.playedNotes, 'played');
      // console.log(this.songNotes);
      // console.log(this.playedDurations, this.songDurations);          
      const average = data => data.length > 0? data.reduce((sum, value) => sum + value) / data.length: 0;
      const standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)));
         
      //logging
      const logObj = {
        userId: this.user._id,
        username: this.user.username,
        experimentMode: this.experiment.mode,
        experimentFolder: this.experiment.folder,
        expBlockNum: this.experiment.currentBlockNum + 1, //so that block number starts from 0
        expMidiFileName: this.experiment.currentMidi? this.experiment.currentMidi: "",

        playedNotes: this.playedNotes,
        playedOnsets: this.playedDurations,
        playedOffsets: this.playedOffsets,
        playedVelocities: this.playedVelocities
      };

      switch(this.experiment.mode){
        case 'speed': {
          const speedW = performanceEvaluation.getSpeedW(this.playedNotes, this.songNotes);
          const {durations, speedD} = performanceEvaluation.getSpeedD(this.playedNotes, this.songNotes, this.playedDurations)
          const transitionSpeeds = performanceEvaluation.getTransitionSpeeds(this.playedNotes, this.songNotes, this.playedDurations);
          let meanTransitionSpeeds = [];
          if (transitionSpeeds.length != 0) {
            transitionSpeeds.forEach(element => {
              meanTransitionSpeeds.push(element.reduce((a,b) => a + b, 0))
            });
          }
          const accuracyW = performanceEvaluation.getAccuracyW(this.playedNotes, this.songNotes);

          Object.assign(logObj, {
            speedW: speedW, //corrects
            sequenceDurations: durations, // array of ms
            speedD: speedD, //ms
            accuracyW: accuracyW, //incorrects
            transitionSpeeds: transitionSpeeds, //array of array of ms
            transitionSpeedMean: meanTransitionSpeeds, //array of ms
          });

          break;
        }
        case 'rhythm': {
          const pitchAcc = performanceEvaluation.getAccuracyB_2(this.playedNotes, this.songNotes);
          const rhythmDiff = performanceEvaluation.getRhythmTempo(this.playedDurations, this.songDurations);
          console.log(rhythmDiff);
          // const rhythmDiff = performanceEvaluation.getRhythm(this.playedDurations, this.songDurations);
          this.experiment.feedbackStatus = pitchAcc === 100? 's': 'w';
          this.experiment.feedbackStatus += rhythmDiff <= config.maxRhythmError? 's': 'w';
       
          const pitchErrorNum = performanceEvaluation.getAccuracyD_2(this.playedNotes, this.songNotes);
          const missedNotes = performanceEvaluation.getMissedNotes(this.playedNotes, this.songNotes);
          let missedNoteNum = missedNotes.length;
          const IOIs = performanceEvaluation.getIOIs(this.playedDurations, this.songDurations);
          const sequenceDuration = missedNoteNum? 0: this.playedDurations[this.playedDurations.length-1] - this.playedDurations[0];
          const meanIOI = average(IOIs);
          const sdIOI = standardDeviation(IOIs);
          const cvIOI = sdIOI / meanIOI;

          Object.assign(logObj, {
            pitchErrorNum: pitchErrorNum, //errors
            missedNotes: missedNotes, //array of number
            missedNoteNum: missedNoteNum, //notes
            IOIs: IOIs, //array of ms
            IOImean: meanIOI, //ms
            IOIsd: sdIOI,
            IOIcv: cvIOI,
            sequenceDuration: sequenceDuration, //ms
            above50sFlag: sequenceDuration > 50000,
            pitchAcc: pitchAcc, //%
            rhythmDiff: rhythmDiff, //proportion
          });
          break;
        }
      }

      console.log(logObj);
      // send results
      this.create(logObj);

      // if (feedbackStatus === 'ss') {
      //   // prepare for next round
      //   this.setSongNum(this.songNum + 1);
      //   // update user progress
      //   this.updateUser({
      //     _id: this.user._id,
      //     lastMidiFile: this.songNum.toString()
      //   })
      // }

    }
  },
  mounted() {
    this.initState();
    this.picName = this.experiment.picName;
    this.experiment.feedbackStatus = 'ww';

    this.setPlayedNotes([]);
    this.setPlayedDurations([]);
    this.setPlayedOffsets([]);
    this.setPlayedVelocities([]);

    this.experiment.finished = false;
      
    this.current = this.experiment.flow[this.experiment.nextFlowIndex];
    if (this.current.hasOwnProperty('timeoutInSeconds')) {
      this.mainTimeOut = window.setTimeout(() => {
        this.onNext();
      }, this.current.timeoutInSeconds * 1000);      
    }

    // const timeout = this.songNotes.length * 150; //ms
    // window.setTimeout(() => { this.$router.push({name: 'feedback', params: {'status':feedbackStatus}}); }, 
    //   timeout > 2000 ? 2000: timeout, feedbackStatus);
  },
  destroyed() {
    window.clearTimeout(this.mainTimeOut);
  },
  watch: {
    playProgress(val) {
      switch(this.experiment.mode){
        case 'speed' :
          if (val >= 100) {
            this.experiment.feedbackStatus = 'ss';
          }
        break;

        case 'rhythm':
          if (val >= 100) {
            window.clearTimeout(this.mainTimeOut);
	          this.experiment.finished = true;
            window.setTimeout(() => { this.onNext(); this.experiment.finished = false;}, 500);            
          }
        break;
      }
    }
  }
}
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
