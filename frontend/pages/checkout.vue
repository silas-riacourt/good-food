<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="8">
        <h1 class="font-weight-light">
          Commander
        </h1>
      </v-col>
      <v-col cols="8">
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
              <p>Récapitulatif</p>

              <v-btn
                color="warning"
                @click="step = 2"
              >
                Suivant
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <p>Vos coordonnées</p>
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
      step: 1,
      payementMethod: null,
      order: {
        totalPrice: 10,
        date: new Date(),
        status: 'IN_PROGRESS',
        paymentMethod: null
      },
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
      cart: 'cart/getCart',
      loading: 'cart/isLoading',
      totalPrice: 'cart/totalPrice'
    })

  },
  methods: {
    checkout () {
      this.checkoutRequest()
    },
    checkoutRequest () {
      this.order.totalPrice = this.totalPrice
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
    createProductOrders (idOrder) {
      console.log(this.cart)
      console.log(idOrder)

      const productOrder = this.productOrder
      this.cart.forEach((product) => {
        productOrder.quantity = product.quantity
        productOrder.totalPrice = product.quantity * product.price
        productOrder.product = product
        productOrder.order.id = idOrder

        this.$axios.$post('/api/product-orders', productOrder)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => { this.loading = false })
      })
    }
  }
}
</script>
