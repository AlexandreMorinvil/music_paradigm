<template>
  <div id="experiment" class="experiment-context experimen-grid">
    
    <div id="experiment-status">
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
        <li>
          <piano />
        </li>
      </ul>
    </div>

    <div id="experiment-progress-bar">
      <div id="experiment-progress"> </div>
    </div>

    <div id="experiment-state">
      <router-view class="centered"/>
    </div>
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
.experimen-grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 200px 10px;
  grid-gap: 0px;
}
.experiment-context {
  padding: 0px 20px 0px;
  background-color: blanchedalmond;
  height: 100%;
}
#experiment-status {
  background-color: rgb(50, 50, 50);
}
#experiment-progress-bar {
  background-color: rgb(30, 30, 30);
  height: inherit;
}
#experiment-progress {
  background-color: rgb(0, 100, 255);
  height: inherit;
  width: 50%;
}
#experiment-state {
  background-color: rgb(0, 200, 0);
  /* min-height: 400px; */
  justify-content: center; /* Doesn't work yet */
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>