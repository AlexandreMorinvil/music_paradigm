<template>
  <div class="user-page-grid">
    <div id="user-main">
      <router-view class="main-display" />
    </div>
    <application-footer> </application-footer>
  </div>
</template>

<script>
import ApplicationFooter from "@/components/ApplicationFooter.vue";

export default {
  name: "UserPage",
  components: {
    applicationFooter: ApplicationFooter,
  },
  data() {
    return {
      activePage: "undefined",
    };
  },
  computed: {},
  methods: {},
  created() {},
  watch: {
    // On change of the route, we reevaluate the current page
    $route: {
      immediate: true,
      handler(to) {
        let currentPage = "undefined";
        const pageList = ["home", "experiments", "account"];
        for (var i in pageList) {
          var page = pageList[i];
          if (to.name === `user.${page}`) {
            currentPage = page;
          }
        }
        this.activePage = currentPage;
      },
    },
  },
};
</script>

<style scoped>
.user-page-grid {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}
</style>
