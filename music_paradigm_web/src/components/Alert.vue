<template>
  <div class="alert position dimentsions" :class="alertMessageClass">
    <div class="type-area" :class="alertTypeClass">
      <strong>{{alertPrefix}}</strong>
    </div>

    <div class="message-area">{{alertMessage}}</div>

    <div class="close-button" v-on:click="clearAlert">&times;</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Alert",
  data() {
    return {
      timeoutUniqueIdentifier: 0,
      timeoutInSeconds: 15,
    };
  },
  computed: {
    ...mapGetters("alert", ["hasAlert", "alertType", "alertMessage"]),
    alertTypeClass() {
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
    alertMessageClass() {
      return this.alertTypeClass + "-message";
    },

    alertPrefix() {
      return this.alertType.toUpperCase() + ":";
    },
  },
  methods: {
    ...mapActions("alert", ["clearAlert"])
  },
  beforeDestroy() {
    clearTimeout(this.timeoutUniqueIdentifier);
  },
  watch: {
    hasAlert: {
      immediate: true,
      handler: function (value) {
        if (value) {
          this.timeoutUniqueIdentifier = setTimeout(
            this.clearAlert,
            this.timeoutInSeconds * 1000
          );
        } else {
          clearTimeout(this.timeoutUniqueIdentifier);
        }
      },
    },
  },
};
</script>

<style scoped>
.alert {
  display: flex;
  align-items: stretch;
  color: rgb(125, 125, 125);
  opacity: 1;
  transition: opacity 0.6s;
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

.type-area {
  color: white;
  border-radius: 2px 0 0 2px;
  padding: 20px;
  display: inline-block;
  width: auto;
}

.message-area {
  width: 100%;
  padding: 20px;
}

.close-button {
  padding: 10px;
  width: auto;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  cursor: pointer;
  transition: 0.3s;
}

.success {
  background-color: #4caf50;
}
.information {
  background-color: #2196f3;
}
.warning {
  background-color: #ff9800;
}
.error {
  background-color: #f44336;
}

.success-message {
  background-color: #daffdc;
}
.information-message {
  background-color: #cfeaff;
}
.warning-message {
  background-color: #ffe9c8;
}
.error-message {
  background-color: #ffbeb8;
}

.close-button:hover {
  color: black;
}
</style>
