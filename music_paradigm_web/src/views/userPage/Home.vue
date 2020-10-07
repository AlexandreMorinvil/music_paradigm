<template>
  <div class="page-grid">
    <div class="area-title">Home Page</div>

    <div class="area-overview">
      <h2>Progression</h2>
      <overview-table />
    </div>

    <div class="area-button">
      <button class="main-button">
        <router-link :to="{ name: 'user.experiment' }">Home</router-link>
        Run Today’s Session
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import OverviewTable from "@/components/user/OverviewTable.vue";

export default {
  name: "UserHome",
  components: {
    overviewTable: OverviewTable,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions("account", ["fetchProgressionSummary"]),
  },
  beforeMount() {
    this.fetchProgressionSummary();
  },
};
</script>

<style scoped>
.page-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  grid-template-rows: auto 50% auto;
  grid-template-areas:
    "title"
    "overview"
    "button";
  height: 100%;
  width: 100%;
}

.area-title {
  grid-area: title;
}

.area-overview {
  grid-area: overview;
}

.area-button {
  grid-area: button;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-button {
  width: 75%;
  min-width: 500px;
  max-width: 1000px;
  padding: 40px;
  font-size: 2em;
}
</style>
