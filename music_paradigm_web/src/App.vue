<template>
  <div id="app" class="container">
    <router-view />
    <footer v-if="appInited && !useMidiInput">{{currentOctave}}</footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import MidiPlayer from '@/MidiPlayer/index.js'
import map from '@/_helpers/keyboardMapping'
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

      'addSongNotes',
      'setSongNotes',
      'addSongDurations',
      'setSongDurations',

      'addPlayedNotes',
      'setPlayedNotes',
      'addPlayedDurations',
      'setPlayedDurations',
      'addPlayedOffsets',
      'setPlayedOffsets',
      'addPlayedVelocities',
      'setPlayedVelocities',
    ]),
    onMidiMessage (msg) { //msg is event with mssg.data=[event,note,velocity], event 144 noteon 128 noteoff,note 0-127, velocity 0-127
      const mm = {
        messageType: msg.data[0] == 144? 'noteon': 'noteoff',
        key: msg.data[1],
        velocity: msg.data[2]
      }
      // console.log(mm.velocity);
      if (mm.messageType === 'noteon' && mm.velocity < 20) { //for accidental press
        mm.messageType = 'noteoff';
      }

      switch (mm.messageType) {
          case 'noteon':
          this.playFlag = this.experiment.currentFlowState? this.experiment.currentFlowState.hasOwnProperty("enableSoundFlag"): false;
          if (this.$route.name === "playing" || this.playFlag === true) {
            if (mm.key === 1 || this.experiment.finished == true ) break;
            // Fix here
            
            // Quick fix
            if (this.previousKey !== null && this.localStarteds[this.previousKey]) {
              this.localStarteds[this.previousKey].stop();            
              delete this.localStarteds[this.previousKey]
              this.addPlayedOffsets(new Date().getTime());
            }

            this.localStarteds[mm.key] = this.piano.play(mm.key, 0, { gain: (vel) => {return (vel) / 127} });  // GainNode
            this.addPlayedNotes(mm.key);
            this.addPlayedDurations(new Date().getTime());    
            this.addPlayedVelocities(mm.velocity);
            this.previousKey = mm.key;    
          } else if (mm.key === 1 || this.experiment.hasOwnProperty("anyPianoKey")) {
            // space bar or
            // any piano key by adding 'anyPianoKey: 1' in .config
            this.addStarted(mm.key);
          }
          break;

        case 'noteoff':
          if (mm.key === 1) break;
          if (this.localStarteds[mm.key]) {
            this.localStarteds[mm.key].stop();            
            delete this.localStarteds[mm.key]
            this.addPlayedOffsets(new Date().getTime());
          }
          
          this.deleteStarted(mm.key);          
          break;
      }
      // console.log(Object.keys(this.starteds));
      // console.log(Object.keys(this.starteds).length);
      // console.log("62" in this.starteds);
    },
    toNote (e) {
      // Check the event key against the midi map.
      // return map[ (typeof e.which === "number")? e.which : e.keyCode ];
      return map[e.key];
    },
    appInit () {
      console.log('Sound inited');
      // Initialize audio
      const ac = new AudioContext();
      const Soundfont = require('soundfont-player');

      this.setPlayer(new MidiPlayer.Player());    
      Soundfont.instrument(ac, this.experiment.timbreFile).then((piano) => {
        this.piano = piano;

        // MIDI input (piano) events
        window.navigator.requestMIDIAccess().then((midiAccess) => {
          // console.log(midiAccess.inputs.values())
          midiAccess.inputs.forEach((midiInput) => {
            midiInput.onmidimessage = this.onMidiMessage;
            this.useMidiInput = true;
          })
        })
        
        // Keyboard events
        // Keep track of keydown and keyup events so that the keydown event doesn't send messages repeatedly until keyup.
        let flags = {}; 
        window.addEventListener('keydown',(e) => { //keyDown = noteOn
          const note = this.toNote(e);
          // If the key doesn't exist in the midi map, or we're trying to send a
          // noteOn event without having most recently sent a noteOff, end here.
          if (note === undefined || flags[note]) return false;
          flags[note] = true;
          this.onMidiMessage({data: [144, note, 127]});
        });
        window.addEventListener('keyup', (e) => { //keyUp = noteOff
          // key pitch + 12 
          if (e.code === "ShiftLeft") {
            console.log("Octave down")
            this.currentOctave -= 1;
            for (let mapKey in map) {
              if (mapKey === " ") continue;
              map[mapKey] -= 12;
            }
          } else if (e.code === "ShiftRight") {
            console.log("Octave up")
            this.currentOctave += 1;
            for (let mapKey in map) {
              if (mapKey === " ") continue;
              map[mapKey] += 12;
            }
          } else {
            const note = this.toNote(e);
            if (note === undefined) return false;
            flags[note] = false;
            this.onMidiMessage({data: [128, note, 127]});
          }
        });
        
        // play MIDI file
        this.player.on('midiEvent', (event) => {
          if (event.name == 'Note on') {
            const currTime = ac.currentTime;
            // change the pressure sensitivity here
              this.piano.play(event.noteName, currTime, {gain: event.velocity / 127 , duration: 1});

            if (event.velocity != 0) {
              this.addSongNotes(event.noteNumber);
              this.addSongDurations(Math.round(currTime * 1000));            
            }
          }
        });
      });
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
