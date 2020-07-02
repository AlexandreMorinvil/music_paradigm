<template>
  <div id="app">
    <img id="end-img" :src="apiUrl+'/static/'+pictureName" alt="End" />
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      pictureName: ""
    };
  },
  methods: {
    // ...mapActions("experiment", ["initState"]),
    // TODO: Ensuring that the name "onNext" is changed to "goNextStep" if it is accruate in this state
    onNext() {
      // this.$router.push({name: 'cue'});
      if (this.experiment.currentBlockNum === this.experiment.totalBlockNum) {
        this.experiment.nextFlowIndex += 1;
        this.$router.push({ name: "login" });
      } else {
        this.experiment.currentBlockNum += 1;
        this.pictureName =
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
        // TODO: Ensuring that the name "onNext" is changed to "goNextStep" if it is accruate in this state
        this.onNext();
      }
    }
  },
  mounted() {
    // this.initState();
    this.pictureName = this.experiment.pictureName;
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
