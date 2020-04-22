<template>
  <div id="app" class="container">
    <router-view />
    <footer v-if="appInited && !useMidiInput">{{currentOctave}}</footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import '@/config';

export default {
  name:"app",
  data() {
    return {
      piano: null,
      localStarteds: {},
      appInited: false,
      playFlag: false,
      finished: false,
      currentOctave: 0,
      useMidiInput: false,  

      // Quick fix
      previousKey: null
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
      'addStarted',
      'deleteStarted',
      'setPlayer',
    ]),
    appInit () {

        // To complete in ThePiano.vue
      
    }
  },
  watch: {
    experiment() {
      if (this.experiment.name && !this.appInited) {
        this.appInit();
        this.appInited = true;
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
