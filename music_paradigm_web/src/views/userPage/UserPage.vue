<template>
  <div class="page-grid">
    <div id="sidebar" class="sidebar-position sidebar">
      <router-link :to="{name: 'user.home'}">Home</router-link>
      <router-link :to="{name: 'user.experiments'}">Experiments</router-link>
      <router-link :to="{name: 'user.account'}">Account</router-link>
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
};
</script>

<style scoped>
</style>
