<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="8">
        <h1 class="font-weight-light">
          Commander
        </h1>
      </v-col>
      <v-col cols="12" lg="8">
        <v-stepper v-model="step" color="warning">
          <v-stepper-header>
            <v-stepper-step
              color="warning"
              :complete="step > 1"
              step="1"
            >
              Panier
            </v-stepper-step>

            <v-divider />

            <v-stepper-step
              color="warning"
              :complete="step > 2"
              step="2"
            >
              Coordonnées
            </v-stepper-step>

            <v-divider />

            <v-stepper-step step="3" color="warning">
              Payement
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <h3 class="pb-2">
                Récapitulatif de votre commande
              </h3>
              <p>
                Restaurant : <strong>{{ restaurant.name }}</strong>
                <v-row align="center" class="mb-2 mt-2">
                  <v-col v-for="(product,i) in products" :key="i" cols="auto">
                    <v-card outlined min-width="350px" max-width="350px">
                      <v-list-item>
                        <v-list-item-avatar class="mr-0">
                          <v-img :src="require(`~/assets/${product.image}.png`)" max-width="50" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-card-title class="text-uppercase" style="word-break:normal;">
                            {{ product.name }}
                          </v-card-title>
                          <v-card-subtitle>{{ product.price }} €</v-card-subtitle>
                          <v-row justify="space-between" align="center">
                            <v-col cols="8">
                              <v-btn
                                class="mx-2"
                                fab
                                x-small
                                color="warning"
                                outlined
                                @click="$store.commit('cart/updateQuantityRemoveOne', {product})"
                              >
                                <v-icon color="black">
                                  mdi-minus
                                </v-icon>
                              </v-btn>
                              {{ product.quantity }}
                              <v-btn
                                class="mx-2"
                                fab
                                x-small
                                color="warning"
                                outlined
                                @click="$store.commit('cart/updateQuantityAddOne', {product})"
                              >
                                <v-icon color="black">
                                  mdi-plus
                                </v-icon>
                              </v-btn>
                            </v-col>
                            <v-col :key="product.quantity" cols="4">
                              {{ ((product.price * product.tva) * product.quantity).toFixed(2) }} € TTC
                            </v-col>
                          </v-row>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row justify="space-between" no-gutters class="pb-4">
                  <v-col>
                    <h2> Total (HT)</h2>
                  </v-col>
                  <v-col class="text-right">
                    <h2> {{ totalPriceHT.toFixed(2) }}€</h2>
                  </v-col>
                </v-row>
                <v-row justify="space-between" no-gutters class="pb-4">
                  <v-col>
                    <h2> TVA</h2>
                  </v-col>
                  <v-col class="text-right">
                    <h2> {{ (totalPrice - totalPriceHT).toFixed(2) }}€</h2>
                  </v-col>
                </v-row>
                <v-row justify="space-between" no-gutters class="pb-4">
                  <v-col>
                    <h2> Total (TTC)</h2>
                  </v-col>
                  <v-col class="text-right">
                    <h2> {{ totalPrice.toFixed(2) }}€</h2>
                  </v-col>
                </v-row>
                <v-btn
                  color="warning"
                  @click="step = 2"
                >
                  Suivant
                </v-btn>
              </p>
            </v-stepper-content>

            <v-stepper-content step="2">
              <h3 class="pb-2">
                Vos coordonnées
              </h3>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="email" label="mail" />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="phone" label="Numéro téléphone" />
                </v-col>
              </v-row>
              <v-btn
                color="warning"
                @click="step = 3"
              >
                Suivant
              </v-btn>

              <v-btn text @click="step = 1">
                Retour
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <h3 class="pb-2">
                Payement
              </h3>
              <v-container fluid>
                <v-radio-group v-model="order.paymentMethod" col>
                  <template #label>
                    <div>Choisisser votre <strong> méthode de payement</strong></div>
                  </template>
                  <v-radio value="PAYPAL" label="Paypal" color="warning" />
                  <v-radio value="CREDITCARD" label="Carte" color="warning">
                    <template #label>
                      <div>
                        Carte <v-icon color="warning">
                          mdi-credit-card
                        </v-icon>
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-container>
              <v-btn
                color="warning"
                @click="checkout()"
              >
                Payer
              </v-btn>

              <v-btn text @click="step = 2">
                Retour
              </v-btn>
            </v-stepper-content>
            <v-stepper-content step="4">
              <h3 class="pb-2">
                Merci pour votre commande !
              </h3>

              <v-btn
                color="warning"
                to="/orders"
              >
                Voir mes commandes
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CheckoutPage',
  data () {
    return {
      phone: '',
      step: 1,
      payementMethod: null,
      order: {
        totalPrice: 10,
        date: new Date(),
        status: 'IN_PROGRESS',
        paymentMethod: null
      },
      client: null,
      productOrder: {
        quantity: 1,
        totalPrice: 8,
        product: {
        },
        order: {
          id: 1311
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      products: 'cart/getCart',
      restaurant: 'cart/getRestaurant',
      loading: 'cart/isLoading',
      totalPrice: 'cart/totalPrice',
      totalPriceHT: 'cart/totalPriceHT'
    }),
    email: {
      get () {
        return this.$auth.user.email
      },
      set (value) {

      }
    }
  },
  mounted () {
    this.getClientId()
  },
  methods: {
    checkout () {
      this.checkoutRequest()
    },
    checkoutRequest () {
      this.order.totalPrice = this.totalPrice
      this.order.restaurant = this.restaurant
      this.order.client = this.client
      this.$axios.$post('/api/orders', this.order)
        .then((response) => {
          const id = response.id
          this.createProductOrders(id)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => { this.loading = false })
    },
    getClientId () {
      this.$axios.$get('/api/clients/by-user-id/' + this.$auth.user.id)
        .then((response) => {
          this.client = response
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => { this.loading = false })
    },
    createProductOrders (idOrder) {
      const productOrder = this.productOrder
      this.products.forEach((product) => {
        productOrder.quantity = product.quantity
        productOrder.totalPrice = product.quantity * product.price
        productOrder.product = product
        productOrder.order.id = idOrder

        this.$axios.$post('/api/product-orders', productOrder)
          .then((response) => {
            console.log(response)
            this.$store.commit('cart/resetCart')
          })
          .catch((error) => {
            console.log(error)
          })
      })
      this.step = 4
    }

  }
}
</script>
