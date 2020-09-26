<template>
  <div class="widget-tab">
    <div class="widget-header">
      <div class="container" v-on:click="toggle()" :class="isShown && 'change'">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>

      <slot name="title">Header</slot>
    </div>

    <div :style="!isShown && 'display: none;'">
      <slot name="widget"></slot>
    </div>

    <div :style="isShown && 'display: none;'" class="padding"> 
    </div>

  </div>
</template>

<script>
export default {
  name: "WidgetContext",
  props: {
    isShownInitial: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      isShown: true
    };
  },
  computed: {
    widgetDisplay() {
      if (this.isShown) return "initial";
      else return "none";
    },
  },
  methods: {
    toggle() {
      this.isShown = !this.isShown;
    },
  },
  mounted() {
    this.isShown = this.isShownInitial;
  },
  destroyed() {},
  watch: {},
};
</script>

<style scoped>
.widget-header {
  display: flex;
  align-items: center;
  background-color: rgb(225, 225, 230);
  color: black;
  padding: 5px;
  border: solid rgb(210, 210, 215) 2px;
}

.display {
  display: initial;
}

.hide {
  display: none;
}

/* Icon */
.container {
  display: inline-block;
  cursor: pointer;
  margin: 0 20px 0 5px;
}

.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
}

.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

.change .bar2 {
  opacity: 0;
}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}
</style>
