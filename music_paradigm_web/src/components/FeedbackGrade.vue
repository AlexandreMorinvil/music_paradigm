<template>
  <div class="feedbackGrade">
    <h1>{{ grade.criteria }}</h1>
    <svg class="emoji smile" v-if="isSuccess">
      <use xlink:href="sprites.svg#emoji-smile" />
    </svg>
    <svg class="emoji frown" v-else>
      <use xlink:href="sprites.svg#emoji-frown" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "feedbackGrade",
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
  computed: {
    isSuccess() {
      return this.grade.mark >= this.grade.passMark;
    }
  }
};
</script>

<style scoped>
.feedbackGrade {
  font-size: 10em;
  color: white;
}
.emoji {
  display: inline-block;
  stroke-width: 0;
  width: 13em;
  height: 13em;
}

.smile {
  stroke: rgb(0, 200, 0);
  fill: rgb(0, 200, 0);
}

.frown {
  stroke: rgb(200, 0, 0);
  fill: rgb(200, 0, 0);
}
</style>
