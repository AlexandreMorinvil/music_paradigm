<template>
  <div id="app">
    <table>
      <tr>
        <th v-for="grade in grades" :key="grade.criteria">
          <feedback-grade :grade="grade" />
        </th>
      </tr>
    </table>

    <!-- <p>Press space bar to exit</p> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import FeedbackGrade from "@/components/FeedbackGrade";

export default {
  name: "Feedback",
  components: {
    feedbackGrade: FeedbackGrade
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["starteds"]),
    ...mapGetters("piano", ["grades"])
  },
  methods: {
    ...mapActions("experiment", ["goNextStep"])
  },
  mounted() {
    console.log("Got there");
    console.log("Ok");
  },
  watch: {
    starteds(array) {
      if (array.length > 0) {
        this.goNextStep();
      }
    }
  }
};
</script>

<style scoped>
div {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

img {
  max-height: 100%;
  width: auto;
}
</style>
