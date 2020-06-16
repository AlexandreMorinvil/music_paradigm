<template>
  <div>
    <div id="alert" v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
    <div id="app">
      <h2 class="text-center">Music Paradigm</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            v-model="username"
            name="username"
            class="form-control"
            :class="{ 'is-invalid': submitted && !username }"
          />
          <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" name="password" class="form-control" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Login to start</button>
          <img
            v-show="status.loggingIn"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          />
          <!-- <router-link to="/register" class="btn btn-link">Register</router-link> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      submitted: false
    };
  },
  computed: {
    ...mapState(["alert"]),
    ...mapState("account", ["status", "user"]),
    ...mapState("experiment", ["flow", "timbreFile"]) // TODO: Put the timbreFile logic in a piano module
  },
  methods: {
    // ...mapActions(['setSongNum']),
    ...mapActions("account", ["login", "logout"]),
    ...mapActions({ clearAlert: "alert/clear" }),
    ...mapActions("experiment", ["onNext", "setExperiment", "initExperiment"]),
    initState() {
      if (this.user.experimentFile) {
        this.setExperiment(this.user.experiment);
      } else {
        // TODO: Put an alert in there
        console.log("Currently no configuration file attached to user");
      }

      // TODO: Put this piece of logic in a piano VUEX module
      if (this.timbreFile == undefined) {
        this.timbreFile =
          "https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/acoustic_grand_piano-ogg.js";
      }
    },
    proceedExperiment() {
      // TODO : TAKE THIS LOGIC AWAY FROM HERE
      this.initExperiment();
      this.onNext();
    },
    handleSubmit() {
      this.submitted = true;
      const { username, password } = this;
      if (username) {
        this.login({ username, password });
      }
    }
  },
  watch: {
    user() {
      if (this.user ? this.user.token : false) {
        // this.setSongNum(parseInt(this.user.lastMidiFile));

        this.initState();
        this.proceedExperiment();
      }
    }
  },
  mounted() {
    this.clearAlert();
    this.logout();
  }
};
</script>

<style scoped>
#app {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* text-align: center; */
}

h2 {
  color: lightblue;
  margin: 1em 0;
}

.btn {
  margin: 1em 0;
}

#alert {
  display: inline-block;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  margin: 2em 0;
  text-align: center;
  font-size: 1rem;
}

/* .btn {
  background-color: white;
  border: none;
  color: black;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 26px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
}

.btn:hover {
  background-color: #4CAF50;
  color: white;
} */
</style>
