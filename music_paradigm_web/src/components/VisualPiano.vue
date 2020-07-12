<template>
  <!-- The HTML definition of this piano adapted from the open source project : https://codepen.io/zastrow/pen/oDBki -->
  <div id="visual-piano">
    <ul class="set">
      <li id="note-60" class="white c"></li>
      <li id="note-61" class="black cs"></li>
      <li id="note-63" class="white d"></li>
      <li id="note-64" class="black ds"></li>
      <li id="note-65" class="white e"></li>
      <li id="note-66" class="white f"></li>
      <li id="note-67" class="black fs"></li>
      <li id="note-68" class="white g"></li>
      <li id="note-69" class="black gs"></li>
      <li id="note-70" class="white a"></li> 
      <li id="note-71" class="black as"></li>
      <li id="note-72" class="white b"></li>
      <li id="note-73" class="white c"></li>
      <li id="note-74" class="black cs"></li>
      <li id="note-75" class="white d"></li>
      <li id="note-76" class="black ds"></li>
      <li id="note-77" class="white e"></li>
      <li id="note-78" class="white f"></li>
      <li id="note-79" class="black fs"></li>
      <li id="note-80" class="white g"></li>
      <li id="note-81" class="black gs"></li>
      <li id="note-82" class="white a"></li> 
      <li id="note-83" class="black as"></li>
      <li id="note-84" class="white b"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Playing",
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  watch: {}
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
  border-radius: 1em;
  background: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0)
    ),
    rgb(35, 15, 6);
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

ul .white:active {
  border-top: 1px solid #777;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset,
    -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%);
}

.black {
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
</style>
