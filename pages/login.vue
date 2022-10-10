<template>
  <div>
    <h2 class="text-center">Login</h2>
    <hr />
    <b-alert v-if="errorMessage" show variant="danger">
      {{ errorMessage }}
    </b-alert>
    <b-alert v-if="$auth.$state.redirect" show>
      You have to login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </b-alert>
    <b-row align-h="center" class="pt-4">
      <b-col md="4">
        <b-card bg-variant="light">
          <busy-overlay />
          <form @keydown.enter="login">
            <b-form-group label="Username">
              <b-input
                ref="username"
                v-model="username"
                placeholder="anything"
              />
            </b-form-group>

            <b-form-group label="Password">
              <b-input v-model="password" type="password" placeholder="123" />
            </b-form-group>

            <div class="text-center">
              <b-btn variant="primary" block @click="login"> Login </b-btn>
              <b-btn variant="secondary" block @click="localRefresh">
                Login with Refresh
              </b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  middleware: ["auth"],
  data() {
    return {
      username: "",
      password: "123",
      error: null,
    };
  },
  computed: {
    strategies: () => [
      { key: "auth0", name: "Auth0", color: "#ec5425" },
      { key: "google", name: "Google", color: "#4284f4" },
      { key: "facebook", name: "Facebook", color: "#3c65c4" },
      { key: "github", name: "GitHub", color: "#202326" },
    ],
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      );
    },
    isCallback() {
      return Boolean(this.$route.query.callback);
    },
    errorMessage() {
      const { error } = this;
      if (!error || typeof error === "string") {
        return error;
      }
      let msg = "";
      if (error.message) {
        msg += error.message;
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, "")
          .replace(/:/g, ": ")
          .replace(/,/g, " ")})`;
      }
      return msg;
    },
  },
  methods: {
    login() {
      this.error = null;

      return this.$auth
        .loginWith("local", {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          const responseData = err.response?.data;
          this.error = responseData?.error ?? responseData;
        });
    },

    localRefresh() {
      this.error = null;

      return this.$auth
        .loginWith("localRefresh", {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          this.error = err.response?.data;
        });
    },

    loginJWT() {
      this.error = null;

      return this.$auth
        .loginWith("laravelJWT", {
          data: {
            email: "test@test.com",
            password: "12345678",
          },
        })
        .catch((e) => {
          this.error = e.response ? e.response.data : e.toString();
        });
    },

    loginPassport() {
      this.error = null;

      return this.$auth.loginWith("laravelPassport").catch((e) => {
        this.error = e.response ? e.response.data : e.toString();
      });
    },

    loginPassportGrantFlow() {
      this.error = null;

      return this.$auth
        .loginWith("laravelPassportPassword", {
          data: {
            username: "test@test.com",
            password: "12345678",
          },
        })
        .catch((e) => {
          this.error = e.response ? e.response.data.message : e.toString();
        });
    },

    loginSanctum() {
      this.error = null;

      return this.$auth
        .loginWith("laravelSanctum", {
          data: {
            email: "test@test.com",
            password: "12345678",
          },
        })
        .catch((e) => {
          this.error = e.response ? e.response.data : e.toString();
        });
    },
  },
});
</script>

<style scoped>
.login-button {
  border: 0;
}
</style>
