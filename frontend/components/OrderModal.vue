<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="fit-content"
    >
      <v-card>
        <v-card-title>
          <v-icon left>
            mdi-food
          </v-icon> Détails commande
        </v-card-title>
        <v-card-text>
          <v-row justify="center" align="center">
            <v-col class="d-flex justify-center align-center" />
            <v-col cols="12">
              <h2 class="">
                Commande n°{{ order.id }}
              </h2>
              <p>
                Restaurant {{ order.restaurant.name }}
              </p>
            </v-col>
          </v-row>
          <v-row align="center" class="mb-2 mt-2">
            <v-col v-for="(product,i) in products" :key="i" cols="auto">
              <v-card outlined min-width="350px" max-width="350px">
                <v-list-item>
                  <v-list-item-avatar class="mr-0">
                    <v-img :src="require(`~/assets/${product.product.image}.png`)" max-width="50" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-card-title class="text-uppercase" style="word-break:normal;">
                      <v-icon left color="warning">
                        mdi-numeric-{{ product.quantity }}-circle
                      </v-icon>
                      {{ product.product.name }}
                    </v-card-title>
                    <v-card-subtitle>{{ product.product.price }} €</v-card-subtitle>
                    <v-row justify="end" align="center">
                      <v-col :key="product.quantity" cols="4">
                        {{ (product.product.price * product.quantity).toFixed(2) }} €
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
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
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'ProductModal',
  props: {
    order: {
      type: Object,
      required: true
    },
    products: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean
    }
  },
  data () {
    return {

    }
  },
  computed: {

    totalPrice () {
      return this.order.totalPrice
    },
    dialog: {
      get () {
        return this.show
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {

  }

}
</script>
