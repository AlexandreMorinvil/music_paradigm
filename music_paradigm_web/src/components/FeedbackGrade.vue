<template>
  <div>
    <p style="font-size:20px;">{{ passingFace }}</p>
    <!-- <span style="font-size:15px;">{{ grade.criteria }}</span> -->
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
  props: {
    grade: {
      type: Object,
      default() {
        return {
          criteria: "No criteria",
          isPassing: false
        };
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    passingFace() {
      // "&#128522;" : Unicode for a Happy face
      // "&#128543;" : Unicode for a Sad face
      return this.isPassing ? "&#128522;" : "&#128543;";
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
body {
  font-size: 20px;
}
</style>
