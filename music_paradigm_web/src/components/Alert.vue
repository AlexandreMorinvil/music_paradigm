<template>
  <div class="alert position dimentsions" :class="alertClass">
    <span class="close-button" v-on:click="clearAlert">&times;</span>
    <strong>{{alertPrefix}}</strong>
    {{alertMessage}}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "Alert",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("alert", ["alertType", "alertMessage"]),
    alertClass() {
      switch (this.alertType) {
        case "success":
          return "success";
        case "info":
          return "information";
        case "warning":
          return "warning";
        case "error":
          return "error";
        default:
          return "information";
      }
    },
    alertPrefix() {
      return this.alertType.toUpperCase() + ":";
    },
  },
  methods: {
    ...mapActions("alert", ["clearAlert"]),
  }
};
</script>

<style scoped>
.alert {
  padding: 20px;
  color: white;
  opacity: 1;
  transition: opacity 0.6s;
  margin-bottom: 15px;
  text-align: left;
}

.position {
  position: fixed;
  top: 64px;
  margin: auto;
  left: 5%;
  z-index: 10;
}

.dimentsions {
  width: 90%;
  height: auto;
  border-radius: 2px;
}

.alert.success {
  background-color: #4caf50;
}
.alert.information {
  background-color: #2196f3;
}
.alert.warning {
  background-color: #ff9800;
}
.alert.error {
  background-color: #f44336;
}

.close-button {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 1.5em;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.close-button:hover {
  color: black;
}
</style>
