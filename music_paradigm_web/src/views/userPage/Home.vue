<template>
  <div class="page-grid">
    <div class="area-title">Home Page</div>

    <div class="area-overview">
      <overview-table />
    </div>

    <div class="area-button">
      <button>
        <router-link :to="{ name: 'user.experiment' }">Home</router-link>
        Run Today’s Session
      </button>
    </div>

    <div class="area-other">
      Important messages from the experiment administrators
      <br /><br />
      Change password or email
    </div>
  </div>
</template>

<script>
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
  methods: {},
  created() {},
  watch: {},
};
</script>

<style scoped>
.page-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "title"
    "overview"
    "button"
    "other";
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
}

.area-other {
  grid-area: other;
}
</style>
