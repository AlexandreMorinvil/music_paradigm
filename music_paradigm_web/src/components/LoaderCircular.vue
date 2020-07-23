<template>
  <div id="loader-circular" class="loader"></div>
</template>

<script>
export default {
  name: "LoaderCircular",
};
</script>

<style scoped>
.loader {
  border: 16px solid rgb(150, 150, 150); /* Light grey */
  border-top: 16px solid rgb(0, 100, 255); /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
