<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="fit-content"
    >
      <v-card class="mt-4">
        <v-card-text class="pb-0">
          <v-row justify="center" align="center">
            <v-col class="d-flex justify-center align-center">
              <v-img v-if="product.image" :src="require(`~/assets/${product.image}.png`)" max-width="100" />
            </v-col>
            <v-col cols="12">
              <h2 class="text-center">
                {{ product.name }}
              </h2>
            </v-col>
            <v-col cols="12">
              <p>{{ product.description }}</p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class=" pb-4">
          <v-row>
            <v-col cols="12">
              <p class="text-center pb-0">
                Quantité
              </p>
            </v-col>
            <v-col cols="12" class="text-center pt-0 mt-0">
              <v-btn
                class="mx-2"
                fab
                x-small
                color="warning"
                outlined
                :disabled="quantity <= 0"
                @click="quantity--"
              >
                <v-icon color="black">
                  mdi-minus
                </v-icon>
              </v-btn>
              {{ quantity }}
              <v-btn
                class="mx-2"
                fab
                x-small
                color="warning"
                outlined
                @click="quantity++"
              >
                <v-icon color="black">
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <div class="text-center">
                <v-btn block color="warning" class=" text-none" :disabled="quantity <= 0" @click="addProduct">
                  Ajouter au panier : {{ finalPrice.toFixed(2) }} €
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-divider />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'ProductModal',
  props: {
    product: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      quantity: 1
    }
  },
  computed: {
    dialog: {
      get () {
        return this.show
      },
      set (value) {
        if (!value) {
          this.$emit('close')
          this.quantity = 1
        }
      }
    },

    finalPrice () {
      // `this` pointe sur l'instance vm
      return this.quantity * (this.product.price * this.product.tva)
    }
  },
  methods: {
    addProduct () {
      this.$emit('add-product', { product: this.product, quantity: this.quantity })
      this.quantity = 1
    }
  }

}
</script>
