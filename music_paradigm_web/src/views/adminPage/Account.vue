<template>
  <div class="page-grid">
    Admin Account page
    <br />
    <br />Hability to change : First name, Middle name, Last Name, Password, Email, and username of oneself
    (The current account, this page is not to manipulate other accounts).
  </div>
</template>

<script>
export default {
  name: "AdminAccount",
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
