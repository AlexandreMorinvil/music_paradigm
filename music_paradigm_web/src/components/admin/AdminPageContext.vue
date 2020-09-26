<template>
  <div class="page-grid">
    <header class="area-title">
      <h1>{{ title }}</h1>
      <h2>{{ subTitle }}</h2>
    </header>

    <main class="area-main">
      <slot>
        Page to be implemented
      </slot>
    </main>

    <div class="area-footer">
      <footer id="footer">
        <div>
          <h1>Footer</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <h1>Footer</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <h1>Footer</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPageFrame",
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
        return "";
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
#footer {
  display: block;
  position: static;
}

.page-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "title"
    "main"
    "footer";
}

.area-title {
  grid-area: title;
  display: block;
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
