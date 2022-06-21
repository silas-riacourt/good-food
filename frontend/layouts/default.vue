<template>
  <v-app dark>
    <header class="d-none d-sm-block">
      <v-container>
        <v-row justify="center" class="" align="center">
          <v-col cols="12" sm="12" md="12" xl="8">
            <v-row align="center" justify="center">
              <v-col cols="auto" class="pa-0">
                <v-img :src="require(`~/assets/goodfood.png`)" max-width="120" @click="$router.push('/')" />
              </v-col>
              <v-col cols="10">
                <v-row justify="space-between">
                  <v-col cols="auto">
                    <v-row>
                      <v-col cols="auto">
                        <v-btn text to="/engagements" color="warning">
                          Nos engagements
                        </v-btn>
                      </v-col>
                      <v-col cols="auto">
                        <v-btn text to="/" color="warning">
                          Nos restaurants
                          <v-icon right>
                            mdi-silverware-fork-knife
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="auto" offset-xl="1" offset-sm="1">
                    <v-menu
                      v-if="$auth.loggedIn"
                      nudge-bottom="20"
                      bottom
                      offset-y
                    >
                      <template #activator="{ on, attrs }">
                        <v-btn
                          text
                          outlined
                          v-bind="attrs"
                          plain
                          v-on="on"
                        >
                          Mon Compte
                        </v-btn>
                      </template>
                      <v-card class="pa-2">
                        <v-card-title>Bonjour {{ $auth.user.firstName }}</v-card-title>
                        <v-card-subtitle>
                          <nuxt-link to="/account" class="text-overline mb-4" style="text-decoration: none;  color: inherit;">
                            mon compte >
                          </nuxt-link>
                        </v-card-subtitle>

                        <v-list>
                          <v-list-item to="/orders">
                            <v-list-item-icon>
                              <v-icon>mdi-food</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                              <v-list-item-title>Mes commandes</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider />
                          <v-list-item to="/account">
                            <v-list-item-icon>
                              <v-icon>mdi-account-circle</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                              <v-list-item-title>Mon compte</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider />
                          <v-list-item @click="logout()">
                            <v-list-item-icon>
                              <v-icon>mdi-logout</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                              <v-list-item-title>
                                Se deconnecter
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-menu>
                    <v-btn
                      v-else
                      text
                      outlined
                      to="/login"
                    >
                      Connexion
                    </v-btn>
                    <v-btn v-if="!$auth.loggedIn" text outlined class="ml-2" to="/register">
                      Inscription
                    </v-btn>
                    <v-menu
                      nudge-bottom="10"
                      bottom
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template #activator="{ on, attrs }">
                        <v-badge
                          v-show="numberOfProductsInCart > 0"
                          :content="numberOfProductsInCart"
                          color="red"
                          bordered
                          overlap
                        >
                          <v-btn color="warning" class="ml-2" v-bind="attrs" v-on="on">
                            Mon panier
                            <v-icon right>
                              mdi-cart
                            </v-icon>
                          </v-btn>
                        </v-badge>
                        <v-btn v-show="numberOfProductsInCart === 0" color="warning" class="ml-2" v-bind="attrs" v-on="on">
                          Mon panier
                          <v-icon right>
                            mdi-cart
                          </v-icon>
                        </v-btn>
                      </template>
                      <CartCard />
                    </v-menu>
                  </v-col>
                </v-row>
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
      <v-btn value="commander" to="/orders">
        <span>Mes commandes</span>
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>

      <v-btn value="panier" to="/checkout">
        <span>panier</span>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn value="compte" to="/account">
        <span>Compte</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import CartCard from '../components/CartCard.vue'
export default {
  name: 'DefaultLayout',
  components: {
    CartCard
  },
  data () {
    return {
      value: null,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },

  computed: {
    numberOfProductsInCart () {
      return this.$store.state.cart.products.length
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>
