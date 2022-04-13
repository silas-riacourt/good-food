<template>
  <v-app dark>
    <header class="d-none d-sm-block">
      <v-container>
        <v-row justify="space-between" class="" align="center">
          <v-col cols="2">
            <v-img :src="require(`~/assets/goodfood2.png`)" max-width="80" />
          </v-col>

          <v-col cols="auto">
            <v-btn text outlined class="ml-2">
              Inscription
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
    </header>
    <v-main>
      <Nuxt />
    </v-main>
    <v-bottom-navigation
      v-model="value"
      color="warning"
      grow
      fixed
      class="d-fixed d-sm-none"
    >
      <v-btn value="restaurants" to="/">
        <span>Restaurants</span>
        <v-icon>mdi-map-marker-multiple</v-icon>
      </v-btn>
      <v-btn value="commander" to="/restaurant/4">
        <span>Commander</span>
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>
      <v-btn value="compte" to="/account">
        <span>Compte</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout',
  data () {
    return {
      value: null,
      clipped: false,
      drawer: false,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
