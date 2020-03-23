<template>
  <div id="app">
    <!-- <img id='cue-img' :src="apiUrl+'/static/cue/'+startingNode+'.jpg'" onerror="console.log(this.src)"/> -->
    <img id='instruction-img' :src="apiUrl+'/static/'+picName" alt="Cue"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import config from '@/config';

export default {
  name: 'Cue',
  components: {
  },
  data() {
    return {
      apiUrl: config.apiUrl,
      picName: "",
    }
  },
  computed: {
    ...mapState([
      'player',
      
      'experiment'
    ]),
  },
  methods: {
    ...mapActions([
      'setSongNotes',
      'setSongDurations',

      'initState',
      'onNext'
    ])
  },
  mounted() {
    this.initState();
    this.picName = this.experiment.picName;
    this.setSongNotes([]);
    this.setSongDurations([]);

    // online MIDI file loader
    const xhr = new XMLHttpRequest();
    let fileUrl = '';
    this.experiment.currentMidi = this.experiment.currentFlowState.midiFileName[this.experiment.currentBlockNum];
    fileUrl = this.apiUrl + '/static/' + this.experiment.folder + '/' + this.experiment.currentMidi;
    // console.log(fileUrl);
    xhr.open('GET', fileUrl, true);
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    xhr.responseType = "arraybuffer";
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        this.player.loadArrayBuffer(xhr.response);
        // console.log(this.player.events[0].length); //0-9:init till MIDI port, last:end, middle:noteon+noteoff pair
        // console.log(this.player.events[0]);
        setTimeout(() => this.player.play(), 600);
      // } else {
      //   console.error('XHR failed');
      }
    }
  
    // MIDI file
    this.player.on('endOfFile', () => {
      this.onNext();
      this.picName = this.experiment.picName;
      this.player.eventListeners['endOfFile'] = [];
    });
  }
}
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