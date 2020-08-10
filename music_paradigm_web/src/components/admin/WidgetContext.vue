<template>
  <div class="widget-tab">
    <div class="widget-header">
      <slot name="title">Header</slot>
    </div>
    <slot name="widget"></slot>
  </div>
</template>

<script>
export default {
  name: "AdminExperiments",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  destroyed() {},
  watch: {},
};
</script>

<style scoped>
.widget-tab {
}

.widget-header {
  background-color: rgb(125, 125, 125);
}
</style>
