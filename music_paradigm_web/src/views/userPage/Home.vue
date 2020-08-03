<template>
  <div class="page-grid">
    Home page
    <br><br>
    Important messages from the experiment administrators
    <br><br>
    Start button to the latest experiment available
    <br><br>
    Status of the curriculum
  </div>
</template>

<script>
export default {
  name: "UserHome",
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
</style>
