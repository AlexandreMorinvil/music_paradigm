<template>
  <div class="page-grid">
    <div id="sidebar" class="sidebar-position sidebar">
      <router-link :to="{name: 'admin.home'}">Home</router-link>
      <router-link :to="{name: 'admin.users'}">Users</router-link>
      <router-link :to="{name: 'admin.experiments'}">Experiments</router-link>
      <router-link :to="{name: 'admin.curriculums'}">Curriculums</router-link>
      <router-link :to="{name: 'admin.ressources'}">Experiment Ressources</router-link>
      <router-link :to="{name: 'admin.data'}">Data</router-link>
      <router-link :to="{name: 'admin.account'}">Account</router-link>
    </div>
    <div id="user-main" class="main-position">
      <router-view class="main-display"/>
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
