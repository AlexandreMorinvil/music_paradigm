<template>
  <div class="page-grid">
    <div id="sidebar" class="sidebar-position sidebar">
      <a href="#">Home</a>
      <a href="#">Experiment List</a>
    </div>

    <div id="user-main" class="main-position">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
};
</script>

<style scoped>
.page-grid {
  display: grid;
  grid-template-columns: 300px;
  grid-template-areas: "sidebar main";
  height: 100%;
  width: 100%;
}

.sidebar-position {
  grid-area: sidebar;
}

.sidebar {
  background-color: rgb(15, 15, 15);
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: rgb(35, 35, 35);
  border-collapse: collapse;
}

.sidebar a {
  display: block;
  height: 60px;
  border-collapse: collapse;
  padding: 15px 8px 15px 16px;
  text-decoration: none;
  font-size: 0.8em;
  color: rgb(200, 200, 200);
}

.sidebar a:hover {
  background-color: rgb(65, 65, 65);
  color: white;
}

.main-position {
  grid-area: main;
}
</style>
