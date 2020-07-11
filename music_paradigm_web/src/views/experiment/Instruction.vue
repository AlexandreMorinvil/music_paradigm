<template>
  <div id="instruction-state" class="experiment-state-container" :class="gridClass">
    <div
      v-if="hasText"
      id="text-area"
      class="experiment-state-division state-division-text"
    >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

    <div
      v-if="hasVisualMedia"
      id="visual-media-area"
      class="experiment-state-division state-division-visual-media"
      style="background-color:yellow;"
    >
      <img id="instruction-img" :src="urlStatic(pictureName)" alt="Instruction" />
    </div>

    <div
      id="note-area"
      v-if="hasFootnote"
      class="experiment-state-division state-division-text"
      style="background-color:green;"
    >{{ footnote }}</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Instruction",
  components: {},
  props: {
    isSpaceBarPressed: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      false: false
    };
  },
  computed: {
    ...mapState("piano", ["pressedKeys"]),
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", [
      "hasText",
      "hasVisualMedia",
      "hasFootnote",
      "pictureName",
      "textContent",
      "anyPianoKey"
    ]),
    gridClass() {
      if (this.hasFootnote) {
        if (this.hasText && this.hasVisualMedia) return "grid-area-area-note";
        else return "grid-area-note";
      } else {
        if (this.hasText && this.hasVisualMedia) return "grid-area-area";
        else return "grid-single-area";
      }
    },
    footnote() {
      if (this.anyPianoKey)
        return "Any piano key or the space bar for going to the next step";
      else return "Press the space bar for going to the next step";
    }
  },
  methods: {
    ...mapActions("experiment", ["goNextStep"])
  },
  watch: {
    isSpaceBarPressed(isPressed) {
      if (isPressed) {
        this.$emit("stateEnded");
      }
    },
    pressedKeys(keys) {
      if (this.anyPianoKey && keys.length > 0) {
        this.$emit("stateEnded");
      }
    }
  },
  beforeMount() {},
  mounted() {}
};
</script>

<style scoped>
.experiment-state-container {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: space-between;
  grid-template-columns: 100%;

  background-color: chartreuse;
}

.grid-test {
  grid-template-rows: 15% 85%;
}

/* Three areas division */
.grid-area-area-note {
  grid-template-rows: 45% 45% 10%;
}

.grid-big-area-area-note {
  grid-template-rows: 55% 35% 10%;
}

.grid-area-big-area-note {
  grid-template-rows: 35% 55% 10%;
}

.grid-big-area-small-area-note {
  grid-template-rows: 70% 20% 10%;
}

.grid-small-area-big-area-note {
  grid-template-rows: 20% 70% 10%;
}

/* Two areas division */
.grid-area-note {
  grid-template-rows: 90% 10%;
}

.grid-area-area {
  grid-template-rows: 50% 50%;
}

.grid-big-area-area {
  grid-template-rows: 60% 40%;
}

.grid-area-big-area {
  grid-template-rows: 40% 60%;
}

.grid-big-area-small-area {
  grid-template-rows: 80% 20%;
}

.grid-small-area-big-area {
  grid-template-rows: 20% 85%;
}

/* Sigle area division */
.grid-single-area {
  grid-template-rows: 100%;
}

/* State division properties*/
.experiment-state-division {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.state-division-text {
  padding: 0 10% 0;
  font-size: calc(1vh + 1vw);
  text-align: center;
}

.state-division-visual-media > img {
  height: 100%;
  max-height: 100%;
  width: auto;
}
</style>
