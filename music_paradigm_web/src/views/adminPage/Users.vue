<template>
  <div>
    Admin Users page
    <br />
    <br /> Display of all the existing users and their related information and progress in their curricula (and potentially, hability to sort them according to their information)
    <br />
    <br /> Ability to register a new user
    <br /> Ability to modify or delete users
    <br />
    <br /> EXAMPLE OF LEGACY CODE

    <div id="app">
      <h2>Register (Presently not working)</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username *</label>
          <input type="text" v-model="newUser.username" name="username" class="form-control" />
          <!-- <input type="text" v-model="user.username" name="username" class="form-control" :class="{ 'is-invalid': submitted && errors.has('username') }" /> -->
          <!-- <div v-if="submitted && errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div> -->
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="text" v-model="newUser.password" name="password" class="form-control" />
          <!-- <input type="password" v-model="user.password" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" /> -->
          <!-- <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div> -->
        </div>More thinsgs to add...
        <div class="form-group">
          <!-- <button class="btn btn-primary" :disabled="status.registering">Register</button> -->
          <!-- <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newUser: {
        username: "",
        password: "",
        experimentFile: "",
      },
      submitted: false,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["register"]),
    initInput() {
      this.newUser.username = "";
      this.newUser.password = "";
    },
    handleSubmit() {
      this.submitted = true;
      // this.$validator.validate().then(valid => {
      //     if (valid) {
      //         this.register(this.newUser);
      //     }
      // });
      console.log(this.newUser);
      if (this.newUser.username != "") {
        if (this.newUser.experimentFile == "") {
          const { experimentFile, ...newUserWithoutExp } = this.newUser;
          this.register(newUserWithoutExp);
          console.log("register w/o exp");
        } else {
          this.register(this.newUser);
          console.log("register");
        }
        this.initInput();
      }
    },
  },
  mounted() {
    this.initInput();
  },
};
</script>

<style scoped>
#app {
  display: block;
}

.btn {
  margin: 1em 0;
}
</style>