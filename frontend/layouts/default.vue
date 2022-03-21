<template>
  <v-app dark>
    <v-main>
      <v-container class="ml-0">
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation v-model="value" color="warning" grow horizontal absolute>
      <v-btn value="restaurants" to="/">
        <span>Restaurants</span>
        <v-icon>mdi-map-marker-multiple</v-icon>
      </v-btn>
      <v-btn value="commander" to="/order">
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
  name: 'DefaultLayout',
  data () {
    return {
      value: null,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
