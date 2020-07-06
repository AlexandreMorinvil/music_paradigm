<template>
  <div class="feedback" id="feedback">
    <ul class="feedbackGradeBoard">
      <li class="feedbackElement" v-for="grade in grades" :key="grade.criteria">
        <feedback-grade class="feedbackGrade" :grade="grade" />
      </li>
    </ul>

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
    ...mapState(["pressedKeys"]),
    ...mapGetters("piano", ["grades", "pressedKeys"])
  },
  methods: {
    ...mapActions("experiment", ["goNextStep"])
  },
  mounted() {
    console.log("Got there");
    console.log("Ok");
  },
  watch: {
    pressedKeys(array) {
      if (array.length > 0) {
        this.goNextStep();
      }
    }
  }
};
</script>

<style scoped>
.feedbackGradeBoard {
  display: block;
  list-style-type: none;
  text-align: center;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.feedbackElement {
  display: inline-block;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 5%;
  margin-right: 5%;
}

.feedbackGrade {
  margin: auto;
}
</style>
