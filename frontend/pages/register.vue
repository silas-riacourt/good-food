<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col lg="4" cols="12">
        <v-card class="elevation-4 pt-6 pb-6 pl-2 pr-2" rounded="10">
          <v-card-title>
            S'enregistrer
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="user.login"
                color="warning"
                prepend-icon="mdi-account"
                label="Nom d'utilisateur"
                type="text"
              />
              <v-text-field
                v-model="user.email"
                color="warning"
                prepend-icon="mdi-account"
                label="Email"
                type="email"
              />
              <v-text-field
                v-model="user.firstName"
                color="warning"
                prepend-icon="mdi-account"
                label="Prénom"
                type="text"
              />
              <v-text-field
                v-model="user.lastName"
                color="warning"
                prepend-icon="mdi-account"
                label="Nom"
                type="text"
              />
              <v-text-field
                v-model="user.password"
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
            <v-btn color="warning" @click="register()">
              Valider
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'RegisterPage',
  auth: false,
  layout: 'default',
  data () {
    return {
      user: {
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        langKey: 'fr',
        password: ''
      },
      showPassword: false,
      loading: false
    }
  },

  methods: {
    async register () {
      this.loading = true
      try {
        await this.$axios.post('/api/register', this.user)
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>
