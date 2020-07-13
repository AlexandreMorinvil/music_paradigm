<template>
  <!-- The HTML definition of this piano adapted from the open source project : https://codepen.io/zastrow/pen/oDBki -->
  <div id="visual-piano">
    <ul class="set">
      <li id="note-48" ref="48" class="white c"></li>
      <li id="note-49" ref="49" class="black cs"></li>
      <li id="note-50" ref="50" class="white d"></li>
      <li id="note-51" ref="51" class="black ds"></li>
      <li id="note-52" ref="52" class="white e"></li>
      <li id="note-53" ref="53" class="white f"></li>
      <li id="note-54" ref="54" class="black fs"></li>
      <li id="note-55" ref="55" class="white g"></li>
      <li id="note-56" ref="56" class="black gs"></li>
      <li id="note-57" ref="57" class="white a"></li>
      <li id="note-58" ref="58" class="black as"></li>
      <li id="note-59" ref="59" class="white b"></li>
      <li id="note-60" ref="60" class="white c"></li>
      <li id="note-61" ref="61" class="black cs"></li>
      <li id="note-62" ref="62" class="white d"></li>
      <li id="note-63" ref="63" class="black ds"></li>
      <li id="note-64" ref="64" class="white e"></li>
      <li id="note-65" ref="65" class="white f"></li>
      <li id="note-66" ref="66" class="black fs"></li>
      <li id="note-67" ref="67" class="white g"></li>
      <li id="note-68" ref="68" class="black gs"></li>
      <li id="note-69" ref="69" class="white a"></li>
      <li id="note-70" ref="70" class="black as"></li>
      <li id="note-71" ref="71" class="white b"></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Playing",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("piano", ["player", "pressedKeys", "midiFileTriggeredKeys"])
  },
  methods: {},
  beforeMount() {},
  mounted() {
    this.$refs["55"].classList.add('user-triggered');
  },
  beforeDestroy() {},
  destroyed() {},
  watch: {
    pressedKeys(list) {
      for (let note = 48; note < 71; note++) {
        if (list.includes(note)) this.$refs[note.toString()].classList.add('user-triggered');
        else this.$refs[note.toString()].classList.remove('user-triggered');
      }
    }
  }
};
</script>

<style scoped>
/* The CSS definition of this piano adapted from the open 
source project : https://codepen.io/zastrow/pen/oDBki */
#visual-piano {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  max-width: 1000px;
  max-height: 350px;
}

ul {
  display: flex;
  justify-content: center;
  height: 97.5%;
  width: 100%;
  margin-bottom: 2.5%;
  padding: 5% 0 0 0;
  position: relative;
  border: 1px solid #160801;
  border-radius: 0.5em;
  background: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0)
    ),
    rgb(102, 44, 18);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) inset,
    0 1px rgba(212, 152, 125, 0.2) inset, 0 5px 15px rgba(0, 0, 0, 0.5);
}

li {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  float: left;
}

ul .white {
  height: 103%;
  width: 6.76%;
  z-index: 1;
  border-left: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  border-radius: 0 0 5px 5px;
  box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset,
    0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #eee 0%, #fff 100%);
}

ul .white:active,
.triggered {
  border-top: 1px solid #777;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset,
    -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%);
}

.black,
.triggered {
  height: 60%;
  width: 4%;
  margin: 0 0 0 -2%;
  z-index: 2;
  border: 1px solid #000;
  border-radius: 0 0 3px 3px;
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #222 0%, #555 100%);
}

.black:active {
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
  background: linear-gradient(to right, #444 0%, #222 100%);
}

.d,
.e,
.g,
.a,
.b {
  margin: 0 0 0 -2%;
}

ul li:first-child {
  border-radius: 5px 0 5px 5px;
}

ul li:last-child {
  border-radius: 0 5px 5px 5px;
}

ul .midi-file-triggered {
  border: 1px solid rgb(19, 117, 4);
  background: linear-gradient(
    to bottom,
    rgb(21, 255, 0) 0%,
    rgb(9, 139, 2) 100%
  );
}

ul .user-triggered {
  border: 1px solid rgb(4, 19, 117);
  background: linear-gradient(
    to bottom,
    rgb(0, 187, 255) 0%,
    rgb(2, 48, 139) 100%
  );
}
</style>
