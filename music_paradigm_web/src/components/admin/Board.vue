<template>
  <div class="widget-tab">


    <ul>
      <li v-for="header in experimentsHeadersList" :key="header._id">
        <button v-on:click="runExperiment(header._id)">Quick select and Start</button>
        {{ header.group }} - {{ header.name }} - {{ header.version }} - {{ header.folder }}
      </li>
    </ul>
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
</style>
