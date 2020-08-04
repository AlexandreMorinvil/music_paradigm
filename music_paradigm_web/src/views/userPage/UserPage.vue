<template>
  <div class="page-grid">
    <div id="sidebar" class="sidebar-position sidebar">
      <router-link
        :to="{ name: 'user.home' }"
        :class="{'currentLink' : (activePage === 'home')}"
      >Home</router-link>
      <router-link
        :to="{ name: 'user.experiments' }"
        :class="{'currentLink' : (activePage === 'experiments')}"
      >Experiments</router-link>
      <router-link
        :to="{ name: 'user.account' }"
        :class="{'currentLink' : (activePage === 'account')}"
      >Account</router-link>
    </div>
    <div id="user-main" class="main-position">
      <router-view class="main-display" />
    </div>
  </div>
</template>

<script>
import "@/styles/loggedInPageTemplate.css";

export default {
  name: "UserPage",
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
</style>
