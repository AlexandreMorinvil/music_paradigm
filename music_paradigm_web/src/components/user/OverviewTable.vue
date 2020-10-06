<template>
  <div>
    Overview: Status of the curriculum
    <div class="table-context" :style="'--elements-per-row:' + elementsPerRow">
      <button
        v-for="(summary, index) in progressionSummary"
        :key="index"
        class="summary"
      >
        <span class="number-label">
          {{ index + 1 }}
        </span>

        Available in 7 days or TItle
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "OverviewTable",
  data() {
    return {
      curriculumProgression: [
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
      ],
    };
  },
  computed: {
    ...mapGetters("account", ["progressionSummary"]),
    elementsPerRow() {
      return Math.min(7, this.curriculumProgression.length);
    },
  },
  methods: {
    ...mapActions("account", ["fetchProgressionSummary"])
  },
  beforeMount() {
  },
  mounted() {
        this.fetchProgressionSummary();
  },
  watch: {},
};
</script>

<style scoped>
.table-context {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(var(--elements-per-row), 1fr);
  padding: 20px;
  background-color: rgb(10, 10, 10);

  border-radius: 10px;
  border-style: solid;
  border-width: 5px;
  border-color: rgb(30, 30, 30);
}

.summary {
  position: relative;
  padding: 10px;
}

.number-label {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
