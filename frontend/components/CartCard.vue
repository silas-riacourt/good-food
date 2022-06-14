<template>
  <v-card class="grow" min-width="250px" max-width="250px">
    <v-row justify="space-between" no-gutters class="pa-4">
      <v-col cols="12" class="mb-2">
        <h3>
          Votre panier
        </h3>
      </v-col>
      <v-col>
        <h4> Total (TTC)</h4>
      </v-col>
      <v-col class="text-right">
        <h4> {{ totalPrice }}€</h4>
      </v-col>
    </v-row>
    <v-card-actions class="justify-center pb-4">
      <div class="text-center">
        <v-btn block color="warning" class=" text-none font-weight-light">
          Valider mon panier
        </v-btn>
      </div>
    </v-card-actions>
    <v-divider />
    <v-card-text>
      <div v-for="(product,i) in cart" :key="i" class="mt-2">
        <p class="font-weight-bold">
          {{ product.name }}
        </p>
        <p>{{ product.description }}</p>
        <v-row justify="space-between" align="center">
          <v-col cols="8">
            <v-btn
              class="mx-2"
              fab
              x-small
              color="warning"
              outlined
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
            >
              <v-icon color="black">
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            {{ product.price * product.quantity }} €
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CartCard',
  props: {
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.0]
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15]
    },
    ...mapGetters({
      cart: 'cart/getCart',
      loading: 'cart/isLoading',
      totalPrice: 'cart/totalPrice'
    })

  },
  data () {
    return {
      quantity: 1
    }
  },
  methods: {
  }

}
</script>
