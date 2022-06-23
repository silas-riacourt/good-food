<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col lg="4" cols="12">
        <v-card class="elevation-4 pt-6 pb-6 pl-2 pr-2" rounded="10">
          <v-card-title>
            S'enregistrer
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
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
                :rules="passwordRules"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="warning" :disabled="!valid" @click="register()">
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
      loading: false,
      valid: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 5) || 'Password must have 5+ characters',
        v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
        v => /(?=.*\d)/.test(v) || 'Must have one number',
        v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]'
      ]

    }
  },

  methods: {
    async register () {
      this.loading = true
      try {
        await this.$axios.post('/api/register', this.user)
        this.$toast.success('Votre compte a bien été crée', { duration: 5000 })
        this.loading = false
        this.$router.push('/login')
      } catch (error) {
        this.loading = false
        this.$toast.error('Erreur : vérifier vos informations', { duration: 5000 })
      }
    }
  }
}
</script>
