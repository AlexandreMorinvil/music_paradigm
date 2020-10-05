<template>
  <div class="page-grid">
    <div class="area-overview">Overview: Status of the curriculum</div>

    <button>
      <router-link :to="{ name: 'user.experiment' }">Home</router-link>
      Run Today’s Session
    </button>

    <br /><br />
    Important messages from the experiment administrators
    <br /><br />
    Change password or email
  </div>
</template>

<script>
export default {
  name: "UserHome",
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
  grid-template-areas: "overview";
  height: 100%;
  width: 100%;
  padding: 20px;
}

.area-overview {
  grid-area: overview;
}
</style>
