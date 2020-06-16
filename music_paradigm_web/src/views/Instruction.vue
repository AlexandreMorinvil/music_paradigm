<template>
  <div id="app">
    <img v-if="picFlag" id="instruction-img" :src="apiUrl+'/static/'+picName" alt="Instruction" />
    <video v-else autoplay>
      <source :src="apiUrl+'/static/'+picName" type="video/mp4" />Your browser does not support HTML5 video.
    </video>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import config from "@/config";

export default {
  name: "Instruction",
  components: {},
  data() {
    return {
      apiUrl: config.apiUrl,
      picName: "",
      picFlag: true
    };
  },
  computed: {
    ...mapState(["starteds"]),
    ...mapState("experiment", ["experiment"])
  },
  methods: {
    ...mapActions("experiment", ["initState", "onNext"]),
    updatePicture() {
      this.picName = this.experiment.picName;
      const splittedName = this.picName.split(".").pop();
      this.picFlag =
        splittedName == "jpg" || splittedName == "png" || splittedName == "bmp";
    }
  },
  watch: {
    // press any piano keys to continue
    starteds() {
      if (this.starteds.length > 0) {
        this.onNext();
        this.updatePicture();
      }
    }
  },
  beforeMount() {
    this.initState();
 },
  mounted() {
    this.updatePicture();
    console.log(this.$store.state);
  }
};
</script>

<style scoped>
img,
video {
  max-height: 100%;
  width: auto;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
