<template>
  <div class="page-grid">
    <header class="area-title">
      <h1>{{ title }}</h1>
      <hr />
      <h2>{{ subTitle }}</h2>
    </header>

    <main class="area-main">
      <slot>
        Page to be implemented
      </slot>
    </main>

    <application-footer> </application-footer>
  </div>
</template>

<script>
import ApplicationFooter from "@/components/ApplicationFooter.vue";

export default {
  name: "AdminPageFrame",
  components: {
    ApplicationFooter: ApplicationFooter,
  },
  props: {
    title: {
      type: String,
      default() {
        return "Title";
      },
    },
    subTitle: {
      type: String,
      default() {
        return "Administrator Management Board";
      },
    },
  },
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
.page-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "title"
    "main"
    "footer";
  height: 100%;
}

.area-title {
  grid-area: title;
  display: block;
  padding: 20px;
  background-color: rgb(15, 15, 15);
  color: rgb(230, 230, 230);
}

.area-title h2 {
  font-size: 1em;
}

.area-main {
  grid-area: main;
  display: block;
}

.area-footer {
  grid-area: footer;
  display: block;
}
</style>
