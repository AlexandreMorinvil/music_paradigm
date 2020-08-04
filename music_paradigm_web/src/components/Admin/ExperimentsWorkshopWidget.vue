<template>
  <div id="experiments-workshop" class="widget">
    THIS IS BEING DISPLAYED
    <form action="/action_page.php">
      <label for="myfile">Select a file:</label>
      <input type="file" id="myfile" name="myfile" v-on:change="handleExperimentFile" />
      <br />
      <textarea id="w3review" name="w3review" rows="20" cols="50" v-model="content">  </textarea>
      <br />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
//import LoaderCircular from "@/components/LoaderCircular.vue";

export default {
  name: "ExperimentsWorkshopWidget",
  components: {
    // loader: LoaderCircular,
  },
  data() {
    return {
      file: "",
      content: "a",
    };
  },
  computed: {},
  methods: {
    handleExperimentFile(event) {
      const input = event.target;

      const readFileContent = function (file) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = (event) => resolve(event.target.result);
          reader.onerror = (error) => reject(error);
          reader.readAsText(file);
        });
      };

      if (!("files" in input) || !(input.files.length === 1)) {
        console.log("A file must be selected");
        // TODO: Add alarm
        return;
      }

      readFileContent(input.files[0])
        .then((content) => {
          this.content = content;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
  destroyed() {},
  watch: {},
};
</script>

<style scoped>
.widget {
  display: grid;
  background-color: cadetblue;
}

.centered .a-position {
  grid-area: header;
}
.b-position {
  grid-area: progress;
}
.experiment-main-position {
  grid-area: main;
}
.experimen-grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 64px 10px;
  grid-template-areas:
    "header" /* Status of the experiment */
    "progress" /* Progress bar of the experiment */
    "main"; /* State of the experiment */
  grid-gap: 0px;
}
</style>
