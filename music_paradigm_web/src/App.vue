<template>
  <div id="app" class="container">
    <router-view />
    <piano />
    <!-- <footer v-if="appSoundInited && !useMidiInput">{{currentOctave}}</footer> -->
  </div>
</template>

<script>
import ThePianoVue from './components/ThePiano.vue';
import { mapState, mapActions } from 'vuex'
import '@/config';

export default {
  name:"app",
  components: {
    piano: ThePianoVue
  },
  data() {
    return {
      appInited: false
    }
  },
  computed: {
    ...mapState([
      'player',
      'experiment',
    ]),
    ...mapState(
      'account', 
      ['user']
    ),
  },
  methods: {
    ...mapActions([
    ]),
  },

  watch: {
    experiment() {
      if (this.experiment.name && !this.appInited) {
        this.appInited = true;
      }
    }
  }
}
</script>


<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
    background-color: black;
    color: white;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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