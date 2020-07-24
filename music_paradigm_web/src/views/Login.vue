<template>
  <div class="content">
    <div id="login-box" class="login-box">
      <div id="login-box-title" class="login-box-title">
        <h1>Login</h1>
      </div>

      <div id="login-box-form" class="login-box-form">
        <loader v-if="status.loggingIn" class="loader"></loader>
        <form v-else @submit.prevent="handleSubmit">
          <div>
            <label for="username">Username</label>
            <input
              type="text"
              v-on:blur="setUsernameHadFocus"
              v-bind:class="{ 'input-text-danger': hasUsernameError }"
              v-model="username"
              name="username"
              placeholder="Enter Username"
            />
            <div v-if="hasUsernameError" class="invalid-input">{{ usernameValidityMessage }}</div>
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" v-model="password" name="password" placeholder="Enter Password" />
            <p class="form-note-text">
              Forgot
              <a class="form-note-text" href="#">password? (not implemented yet)</a>
            </p>
          </div>
          <div>
            <button class="button">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LoaderCircular from "@/components/LoaderCircular.vue";

export default {
  name: "Home",
  components: {
    loader: LoaderCircular,
  },
  data() {
    return {
      username: "",
      password: "",
      hasFocusedOnUsername: false,
      hasAttemptedSubmit: false,
    };
  },
  computed: {
    ...mapState(["alert"]),
    ...mapState("account", ["status", "user"]),
    hasUsernameError() {
      return (
        (this.hasAttemptedSubmit || this.hasFocusedOnUsername) && !this.username
      );
    },
    usernameValidityMessage() {
      if (!this.username) return "Username is required";
      else return "";
    },
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    ...mapActions("experiment", [
      "updateState",
      "setExperiment",
      "setStartingPoint",
    ]),
    setUsernameHadFocus() {
      this.hasFocusedOnUsername = true;
    },
    handleSubmit() {
      this.hasAttemptedSubmit = true;
      const { username, password } = this;
      if (username) {
        this.login({ username, password });
      }
    },
  },
  watch: {
    user() {
      if (this.user ? this.user.token : false) {
        // TODO: The experiment, does it have to be attached to the user?
        this.setExperiment(this.user.experiment);
        this.setStartingPoint(this.user.cursor);
        this.updateState();
      }
    },
  },
  mounted() {
    this.clearAlert();
    this.logout();
  },
};
</script>

<style scoped>
.content {
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100%;
}

.content {
  background-color: rgb(12, 12, 12);
}

#login-box {
  display: block;
  height: auto;
  width: 500px;
  box-sizing: border-box;
  background-color: rgb(20, 20, 20);

  border-collapse: collapse;
  border-color: rgb(35, 35, 35);
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;

  color: rgb(200, 200, 200);
}

.login-box-title {
  background-color: rgb(35, 35, 35);
  height: auto;
  width: 100%;
  border-radius: 5px 5px 0 0;
  padding: 20px;
}

.login-box-form {
  display: block;
  justify-content: center;
  align-content: center;
  padding: 20px;
}

.login-box-form label {
  display: block;
  padding: 10px 0 10px;
  font-size: 1em;
}

.login-box-form input {
  display: block;
  width: 100%;
  padding: 0.4em 0;
  border-radius: 4px;
  padding-left: 10px;
  font-size: 0.8em;
}

.loader {
  width: 300px;
  height: 300px;
  margin: auto;
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

.form-note-text {
  text-align: right;
  font-size: 0.75rem;
  margin: 10px 0 10px;
}

.invalid-input {
  color: red;
  padding-top: 10px;
  font-size: 0.5em;
}

.input-text-danger {
  border-width: 3px;
  border-color: red;
  background-color: rgba(255, 200, 200, 1);
}

.button {
  background-color: rgb(0, 100, 255);
  border: 2px solid rgb(40, 126, 255);
  color: white;
  border-radius: 5px;
  padding: 10px 40px;
  text-align: center;
  display: inline-block;
  font-size: 1em;
  cursor: pointer;
}

.button:hover {
  background-color: rgb(0, 80, 200);
  border: 2px solid rgb(0, 100, 255);
  color: white;
}
</style>
