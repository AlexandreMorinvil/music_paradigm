<template>
  <div id="app">
    <img id="instruction-img" :src="urlStatic(pictureName)" alt="Instruction" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Instruction",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("piano", ["pressedKeys"]),
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", ["pictureName"])
  },
  methods: {
    ...mapActions("experiment", ["goNextStep"])
  },
  watch: {
    pressedKeys() {
      if (this.pressedKeys.length > 0) {
        this.goNextStep();
      }
    }
  },
  beforeMount() {},
  mounted() {}
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
