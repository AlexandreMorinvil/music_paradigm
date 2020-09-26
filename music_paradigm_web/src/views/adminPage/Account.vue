<template>
  <admin-page-context title="Account">
    <div>
      Admin Account page
      <br />
      <br />Hability to change : First name, Middle name, Last Name, Password,
      Email, and username of oneself (The current account, this page is not to
      manipulate other accounts).
    </div>
  </admin-page-context>
</template>

<script>
import AdminPageContext from "@/components/admin/AdminPageContext.vue";

export default {
  name: "AdminAccount",
  components: {
    AdminPageContext: AdminPageContext,
  },
};
</script>

<style scoped></style>
