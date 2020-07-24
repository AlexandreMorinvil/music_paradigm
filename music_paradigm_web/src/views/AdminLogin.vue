<template>
  <div>
    <div id="alert" v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
    <div id="app">
      <h2 class="text-center">Music Paradigm Admin Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
          <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" name="password" class="form-control" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Login</button>
          <img v-show="status.loggingIn" 
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          <!-- <router-link to="/register" class="btn btn-link">Register</router-link> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      username: '',
      password: '',
      submitted: false
    }
  },
  computed: {
    ...mapState(['alert']),
    ...mapState('account', ['status', 'user']),
    experiment: {
      get: function () {
        return this.$store.state.experiment;
      },
      set: function (newValue) {
        this.$store.state.experiment = newValue;
      }
    }
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    ...mapActions({ clearAlert: 'alert/clear' }), // FIXME: This doesn't work anymore
    ...mapActions({ setAlert: 'alert/error' }), // FIXME: This doesn't work anymore
    // TODO: Ensuring that the name "onNext" is changed to "goNextStep" if it is accruate in this state
    onNext () {
      this.$router.push({name: 'register'});
    },
    handleSubmit () {
      this.submitted = true;
      const { username, password } = this;
      if (username == 'LabMaster') { // hardcoded admin username
        this.login({ username, password });
      } else {
        this.setAlert('Only for admin');
      }
    }
  },
  watch: {
    user() {
      if (this.user? this.user.token: false) {
        // TODO: Ensuring that the name "onNext" is changed to "goNextStep" if it is accruate in this state
        this.onNext();
      }
    }
  },
  mounted() {    
    this.clearAlert();
    this.logout();
  }
}
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
