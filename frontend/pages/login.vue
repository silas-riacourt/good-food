<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="4">
        <v-card class="elevation-6">
          <v-card-title>
            Se connecter
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                color="warning"
                prepend-icon="mdi-account"
                label="Nom d'utilisateur / email"
                type="email"
              />
              <v-text-field
                v-model="password"
                color="warning"
                prepend-icon="mdi-lock"
                name="password"
                label="Mot de passe"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="warning" to="/" @click="login()">
              Se connecter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'LoginPage',
  layout: 'login',
  data () {
    return {
      username: '',
      password: '',
      showPassword: false
    }
  },

  methods: {
    async login () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })

        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
