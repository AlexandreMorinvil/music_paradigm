<template>
  <user-page-context title="Home">
    <div class="home-page-grid">
      <div class="area-button">
        <button class="main-button">
          <router-link :to="{ name: 'user.experiment' }">Run Today’s Session</router-link>
        </button>
      </div>

      <div class="area-overview">
        <h2>Progression</h2>
        <overview-table />
      </div>
    </div>
  </user-page-context>
</template>

<script>
import { mapActions } from "vuex";
import UserPageContext from "@/components/user/UserPageContext.vue";
import OverviewTable from "@/components/user/OverviewTable.vue";

export default {
  name: "UserHome",
  components: {
    overviewTable: OverviewTable,
    UserPageContext: UserPageContext,
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
.home-page-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  grid-template-rows: auto 60%;
  grid-template-areas:
    "button"
    "overview";
  height: 100%;
  width: 100%;
}

.area-overview {
  grid-area: overview;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
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
