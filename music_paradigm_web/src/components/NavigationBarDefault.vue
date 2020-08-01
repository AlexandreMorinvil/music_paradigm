<template>
  <div id="navigation-bar">
    <div id="wrapper-left" class="navigation-bar-wrapper"></div>

    <div id="wrapper-center" class="navigation-bar-wrapper">Music Paradigm</div>

    <div id="wrapper-right" class="navigation-bar-wrapper">
      <div
        id="button-leave"
        v-if="isLoggedIn"
        class="app-navigation-bar-button"
        v-on:click="handleLogout"
      >Logout</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NavigationBarDefault",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("account", ["isLoggedIn"]),
  },
  methods: {
    ...mapActions("account", ["logout"]),
    handleLogout() {
      this.logout();
    },
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  watch: {},
};
</script>

<style scoped>
</style>
