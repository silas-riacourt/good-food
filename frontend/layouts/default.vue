<template>
  <v-app dark>
    <header class="d-none d-sm-block">
      <v-container>
        <v-row justify="center" class="" align="center">
          <v-col cols="12" sm="12" md="12" xl="8">
            <v-row align="center" justify="start">
              <v-col cols="auto">
                <v-img :src="require(`~/assets/goodfood2.png`)" max-width="100" />
              </v-col>
              <v-col cols="auto">
                <v-btn text to="/engagements" color="warning">
                  Nos engagements
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn text to="/" color="warning">
                  Nos restaurants
                </v-btn>
              </v-col>
              <v-col cols="auto" offset-xl="3">
                <v-btn text outlined>
                  Mon compte
                </v-btn>
                <v-btn color="warning" class="ml-2">
                  Mon panier
                </v-btn>
              </v-col>
            </v-row>
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
