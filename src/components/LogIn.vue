<template>
  <div id="app">
    <v-app>
      <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <div>
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="#e5f7ff"
            icons-and-text
            grow
            slider-color="#00aeff"
            style="color: #00aeff"
          >
            <v-tab v-for="i in tabs" :key="i">
              <v-icon large color="#00aeff">{{ i.icon }}</v-icon>
              <div class="caption" style="color: #00aeff">{{ i.name }}</div>
            </v-tab>
            <v-tab-item>
              <v-card v-if="loading" style="box-shadow:none !important">
                <v-layout row justify-center class="pt-10 mb-10" >
                  <v-progress-circular
                    :size="70"
                    :width="7"
                    color="rgb(0, 174, 255)"
                    indeterminate
                    v-if="loading"
                  ></v-progress-circular>
                </v-layout>
              </v-card>
              <v-card class="px-4" v-else-if="!loading">
                <v-card-text>
                  <v-form ref="loginForm" v-model="valid" @submit="validate" lazy-validation>
                    <v-row class="justify-center pt-4 pb-4">
                      <GoogleAuth
                        prompt="Sign in With Google"
                        @submitted="gLogIn"
                      />
                    </v-row>
                    <v-row class="justify-center pt-4">
                      ----- Or -----
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginEmail"
                          :rules="loginEmailRules"
                          label="E-mail"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginPassword"
                          :append-icon="showEye ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required]"
                          :type="showEye ? 'text' : 'password'"
                          name="password"
                          label="Password"
                          counter
                          @click:append="showEye = !showEye"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                        class="d-flex"
                        cols="12"
                        sm="7"
                        xsm="12"
                        width="100%"
                      >
                        <v-alert
                          type="error"
                          outlined
                          width="100%"
                          v-if="logInError"
                          >Email or Password is incorrect</v-alert
                        >
                      </v-col>
                      <v-spacer />
                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          x-large
                          type="submit"
                          block
                          :disabled="!valid"
                          color="success"
                          @click="validate"
                        >
                          Login
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card v-if="loading">
                <v-layout row justify-center class="pt-10 mb-10">
                  <v-progress-circular
                    :size="70"
                    :width="7"
                    color="rgb(0, 174, 255)"
                    indeterminate
                    v-if="loading"
                  ></v-progress-circular>
                </v-layout>
              </v-card>
              <v-card class="px-4" v-else-if="!loading">
                <v-card-text>
                  <v-form ref="registerForm" v-model="valid" @submit="validate" lazy-validation>
                    <v-row class="justify-center pt-4 pb-4">
                      <GoogleAuth
                        prompt="Register With Google"
                        ref="gRegister"
                        @submitted="registerAccount"
                      />
                    </v-row>
                    <v-row class="justify-center">
                      ----- Or -----
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="firstName"
                          :rules="[rules.required]"
                          label="First Name"
                          maxlength="20"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="lastName"
                          :rules="[rules.required]"
                          label="Last Name"
                          maxlength="20"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="E-mail"
                          name="email"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="userName"
                          label="Username"
                          name="username"
                          :rules="[rules.required, rules.minUserName]"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="password"
                          :append-icon="showEye ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.password]"
                          :type="showEye ? 'text' : 'password'"
                          name="password"
                          label="Password"
                          hint="Min. 8 characters with at least one capital letter, a number and a special character."
                          counter
                          @click:append="showEye = !showEye"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          block
                          v-model="verify"
                          :append-icon="showEye ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]"
                          :type="showEye ? 'text' : 'password'"
                          name="verify"
                          label="Confirm Password"
                          counter
                          @click:append="showEye = !showEye"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                        class="d-flex"
                        cols="12"
                        sm="7"
                        xsm="12"
                        width="100%"
                      >
                        <v-alert
                          type="error"
                          outlined
                          width="100%"
                          v-if="registerError"
                          >Email already exists</v-alert
                        >
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                        <v-btn
                          x-large
                          block
                          type="submit"
                          :disabled="!valid"
                          color="success"
                          @click="validate"
                          >Register</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import GoogleAuth from "./GoogleAuth";

export default {
  components: {
    GoogleAuth,
  },
  data: () => ({
    dialog: true,
    logInError: false,
    registerError: false,
    tab: 0,
    tabs: [
      {
        name: "Login",
        icon: "mdi-account",
      },
      {
        name: "Register",
        icon: "mdi-account-plus-outline",
      },
    ],
    valid: true,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loading: false,
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    showEye: false,
    rules: {
      required: (value) => !!value || "Required.",
      minUserName: (v) => (v && v.length >= 6) || "Min 6 characters",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
      password: (value) => {
        //eslint-disable-next-line
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Min. 8 characters with at least one capital letter, a number and a special character."
        );
      },
    },
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    onRegister(fromRegister) {
      this.$emit("submitted", fromRegister);
    },
    async gLogIn(GoogleUser) {
      this.logInError = false;
      this.registerError = false;
      this.$store.commit("auth/setError", null);
      const payload = {
        email: GoogleUser.Es.kt,
        password: "Dummy!1951",
      };
      const fromRegister = false;
      this.loading = true;
      await this.logIn(payload, fromRegister);
    },
    async validate() {
      this.logInError = false;
      this.registerError = false;
      this.$store.commit("auth/setError", null);
      if (this.$refs.loginForm.validate()) {
        let payload = {};
        payload = {
          email: this.loginEmail,
          password: this.loginPassword,
        };
        const fromRegister = false;
        await this.logIn(payload, fromRegister);
      } else if (this.$refs.registerForm.validate()) {
        await this.registerAccount();
      }
    },
    async logIn(payload, fromRegister) {
      this.loading = true;
      await this.$store.dispatch("auth/getToken", payload);
      if (this.$store.state.auth.error) {
        if (this.$store.state.auth.error.message == "Network Error") {
          this.loading = false;
          window.alert(
            this.$store.state.auth.error.message + " - Please contact support"
          );
        } else {
          this.loading = false;
          this.logInError = true;
        }
      }
      await this.onRegister(fromRegister);
    },
    async registerAccount(GoogleUser) {
      this.loading = true;
      let payload = {};
      if (GoogleUser && GoogleUser.Es) {
        payload = {
          email: GoogleUser.Mt.tu,
          password: "Dummy!1951",
          first_name: GoogleUser.Es.bT,
          last_name: GoogleUser.Es.dR,
          user_name: GoogleUser.Mt.kt.split("@")[0],
        };
      } else {
        payload = {
          email: this.email,
          password: this.password,
          first_name:
            this.firstName.substring(0, 1).toUpperCase() +
            this.firstName.substring(1).toLowerCase(),
          last_name:
            this.lastName.substring(0, 1).toUpperCase() +
            this.lastName.substring(1).toLowerCase(),
          user_name: this.userName,
        };
      }
      await axios
        .post(`${this.$store.state.url.url}/api/user/create/`, payload)
        .then(() => {
          if (GoogleUser) {
            payload = {
              email: GoogleUser.Es.kt,
              password: "Dummy!1951",
            };
          } else {
            payload = {
              email: this.email,
              password: this.password,
            };
          }
          const fromRegister = true;
          this.loading = false;
          this.logIn(payload, fromRegister);
        })
        .catch(() => {
          this.loading = false;
          this.registerError = true;
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
