<template>
  <div id="experiment" class="experiment-context">
    <router-view />
    <piano />
    <p>THIS IS THE EXPERIEMNT PAGE</p>
    <ul>
      <li>
        <a href="default.asp">Home</a>
      </li>
      <li>
        <a href="news.asp">News</a>
      </li>
      <li>
        <a href="contact.asp">Contact</a>
      </li>
      <li>
        <a href="about.asp">About</a>
      </li>
    </ul>
    <!-- <footer v-if="appSoundInited && !useMidiInput">{{currentOctave}}</footer> -->
  </div>
</template>

<script>
import ThePianoVue from "@/components/ThePiano.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Experiment",
  components: {
    piano: ThePianoVue
  },
  data() {
    return {
      appInited: false
    };
  },
  computed: {
    ...mapState("experiment", ["experimentSet"])
  },
  methods: {
    ...mapActions(["setApplicationInitialization"])
  },
  watch: {
    experimentSet() {
      if (this.experimentSet && !this.appInited) {
        this.setApplicationInitialization(true);
        this.appInited = true;
      }
    }
  }
};
</script>


<style>
.experiment-context {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  background-color: green;
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

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

</style>