<template>
  <v-card id="login">
    <v-card-media :src="require('@/assets/images/login-banner.jpg')" height="200px"></v-card-media>
    <v-card-title primary-title>
      <div style="width: 100%">
        <h4 class="headline ma-0">Admin Login</h4>
        <v-form :value="true" ref="form" lazy-validation class="login-form">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="Username"
                v-model="username"
                :rules="usernameRules"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                :rules="passwordRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 style="display: flex">
              <v-spacer></v-spacer>
              <v-btn @click="submit" class="red--text text--accent-2">submit</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </div>
    </v-card-title>
    
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    username: '',
    usernameRules: [
      v => !!v || 'Name is requred'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required'
    ]
  }),
  methods: {
    submit () {

    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#login {
  max-width: 500px;
  width: 100%;
  margin: auto;
  .login-form {
    text-align: left;
    width: 80%;
    margin: auto;
  }
}
</style>