<template>
  <div id="app">
    <img id="end-img" :src="apiUrl+'/static/'+picName" alt="End" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import config from "@/config";

export default {
  name: "End",
  components: {},
  computed: {
    ...mapState(["starteds"]),
    experiment: {
      get: function() {
        return this.$store.state.experiment;
      },
      set: function(newValue) {
        this.$store.state.experiment = newValue;
      }
    }
  },
  data() {
    return {
      apiUrl: config.apiUrl,
      picName: ""
    };
  },
  methods: {
    ...mapActions("experiment", ["initState"]),
    onNext() {
      // this.$router.push({name: 'cue'});
      if (this.experiment.currentBlockNum === this.experiment.totalBlockNum) {
        this.experiment.nextFlowIndex += 1;
        this.$router.push({ name: "login" });
      } else {
        this.experiment.currentBlockNum += 1;
        this.picName =
          this.experiment.folder +
          "/" +
          this.experiment.currentFlowState.pictureFileName[
            this.experiment.currentBlockNum
          ];
      }
    }
  },
  watch: {
    // press any piano keys to continue
    starteds() {
      if (this.starteds.length > 0) {
        this.onNext();
      }
    }
  },
  mounted() {
    this.initState();
    this.picName = this.experiment.picName;
  }
};
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
