<template>
  <div id="app" class="app-grid">
    <!-- The alert is not considered in the grid display of the application -->
    <alert id="alert" v-if="hasAlert"/>

    <div v-if="true" id="app-header" class="app-header-position">
      <component :is="navigationBarType" id="app-navigation-bar" ref="navigationBar" />
    </div>

    <div id="app-main" class="app-main-position">
      <router-view />
    </div>

    <!-- <footer v-if="appState!=='experiment'"> Footer display </footer> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NavigationBarDefault from "@/components/NavigationBarDefault";
import NavigationBarExperiment from "@/components/NavigationBarExperiment";
import Alert from "@/components/Alert";

export default {
  name: "app",
  components: {
    defaultNavigationBar: NavigationBarDefault,
    experimentNavigationBar: NavigationBarExperiment,
    alert: Alert
  },
  data() {
    return {
      appInited: false,
      appState: "default",
    };
  },
  computed: {
    ...mapGetters("alert", ["hasAlert"]),
    navigationBarType() {
      switch (this.appState) {
        case "experiment":
          return "experimentNavigationBar";
        default:
          return "defaultNavigationBar";
      }
    },
  },
  methods: {
    ...mapActions("account", ["resumeLoginStatus"]),
    ...mapActions("alert", ["clearAlert"])
  },
  created() {
    this.resumeLoginStatus();
  },
  watch: {
    // On change of the route, we reevaluate the state of the application
    $route(to) {
      this.clearAlert();
      let state = "default";
      if (to.matched.some((m) => m.name === "admin")) state = "admin";
      else if (to.matched.some((m) => m.name === "experiment"))
        state = "experiment";
      this.appState = state;
    },
  },
};
</script>


<style>
/* To get the application on full screen */
html,
body,
#app {
  min-height: 100vh;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  background-color: rgb(0, 0, 0);
  color: white;
}
* {
  font-size: 1.3rem;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.app-header-position {
  grid-area: header;
}
.app-main-position {
  grid-area: main;
}
.app-grid {
  display: grid;
  grid-template-rows: 56px;
  grid-template-areas:
    "header"
    "main";
  grid-gap: 0px;
}
#app-header {
  height: inherit;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  background-color: rgb(25, 25, 25);
  border-bottom-color: rgb(35, 35, 35);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

/* Footer */
footer {
  position: fixed;
  right: 0;
  bottom: 0;
  color: white;
  font-size: 0.8rem;
  height: 100%;
}
</style>