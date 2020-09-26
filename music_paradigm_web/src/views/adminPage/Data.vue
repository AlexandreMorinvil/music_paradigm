<template>
  <admin-page-context title="Data">
    Admin Data page
    <br />
    <br />Interface to visualize the data and log files from the experiments
  </admin-page-context>
</template>

<script>
import AdminPageContext from "@/components/admin/AdminPageContext.vue";

export default {
  name: "AdminData",
  components: {
    AdminPageContext: AdminPageContext,
  },
};
</script>

<style scoped></style>
