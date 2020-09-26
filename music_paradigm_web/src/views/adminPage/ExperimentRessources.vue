<template>
  <admin-page-context title="Experiments Ressources">
    <br />
    <br />Interface to upload files
    <br />
    <br />Interface to visualize the files on the server, delete, move files
    from the server
    <br />
    <br />Ability to hear the midi files, see the images, see the videos, see
    txt files
    <br />
    <br />Ability to download files.
  </admin-page-context>
</template>

<script>
import AdminPageContext from "@/components/admin/AdminPageContext.vue";

export default {
  name: "AdminExperimentRessources",
  components: {
    AdminPageContext: AdminPageContext,
  },
};
</script>

<style scoped></style>
