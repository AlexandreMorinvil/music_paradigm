<template>
  <div class="page-grid">Home page</div>
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
