<template>
  <admin-page-context title="Home">
    Admin Home page
    <br /><br />
    Recent activity on the server and important information from the users
  </admin-page-context>
</template>

<script>
import AdminPageContext from "@/components/admin/AdminPageContext.vue";

export default {
  name: "AdminHome",
  components: {
    AdminPageContext: AdminPageContext,
  },
};
</script>

<style scoped></style>
