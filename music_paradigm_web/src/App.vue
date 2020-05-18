<template>
  <div id="app" class="container">
    <router-view />
    <piano />
    <footer v-if="appInited && !useMidiInput">{{currentOctave}}</footer>
  </div>
</template>

<script>
import ThePianoVue from './components/ThePiano.vue';
import { mapState, mapActions } from 'vuex'
import MidiPlayer from '@/MidiPlayer/index.js'
import map from '@/_helpers/keyboardMapping'
import '@/config';

export default {
  name:"app",
  components: {
    piano: ThePianoVue
  },
  data() {
    return {
      piano: null,
      localStarteds: {},
      appSoundInited: false,
      playFlag: false,
      finished: false,
    }
  },
  computed: {
    ...mapState([
      'starteds',
      'player',
      'experiment',
    ]),
    ...mapState('account', ['user']),
  },
  methods: {
    ...mapActions([
    ]),
    
    appSoundInit () {
      console.log('Sound inited');
      // Initialize audio context for all the application
      const ac = new AudioContext();
      const Soundfont = require('soundfont-player');
      this.setPlayer(new MidiPlayer.Player());    
      Soundfont.instrument(ac, this.experiment.timbreFile).then();
    }
  },

  watch: {
    experiment() {
      if (this.experiment.name && !this.appInited) {
        this.appSoundInit();
        this.appSoundInited = true;
      }
    }
  }
}
</script>


<style>
  /* * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  } */
  body {
    /* font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4; */
    background-color: black;
    color: white;
  }
  * {
    font-size: 1.3rem;
  }
  footer {
    position: fixed;
    right: 0;
    bottom: 0;
    color: white;
    font-size: 0.8rem;
  }
</style>