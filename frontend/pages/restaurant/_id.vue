<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="11" md="8">
        <v-row justify="start" align="center" class="mt-4 mb-4">
          <v-col cols="auto">
            <v-icon x-large color="warning">
              mdi-store
            </v-icon>
          </v-col>
          <v-col>
            <h1>{{ restaurant.name }}</h1>

            <p v-if="orderType == 'place'">
              <v-icon>mdi-table-chair</v-icon> Sur place
              <v-btn text class="text-none" @click="orderTypeModal = true">
                Modifier <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </p>
            <p v-if="orderType == 'delivery'">
              <v-icon>mdi-moped</v-icon> Livraison
              <v-btn text class="text-none" @click="orderTypeModal = true">
                Modifier <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </p>
            <p v-if="orderType == 'clickandcollect'">
              <v-icon>mdi-human-male-board</v-icon> Click and collect
              <v-btn text class="text-none" @click="orderTypeModal = true">
                Modifier <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </p>
          </v-col>
          <v-col class="text-right">
            <v-btn text class="text-none" to="/">
              Modifier le restaurant <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider />
        <v-row class="mt-4 mb-4">
          <v-col cols="12" sm="4" md="4">
            <v-list v-if="!loading">
              <v-list-item-group v-model="selectedCategorie" mandatory color="warning" @change="changeCategorie(restaurant.categories[selectedCategorie])">
                <v-list-item
                  v-for="(item) in restaurant.categories"
                  :key="item.title"
                >
                  <v-list-item-avatar>
                    <v-img :src="require(`~/assets/${item.image}.png`)" max-width="50" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-skeleton-loader
              v-else
              class="mx-auto"
              max-width="300"
              type="list-item-three-line"
            />
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <h2 v-if="!loading">
              {{ restaurant.categories[selectedCategorie].name }}
            </h2>
            <v-row v-if="!loading" class="mt-2" justify="center" justify-sm="start">
              <v-col v-for="(product,i) in categorie.products" :key="i" cols="auto">
                <v-card outlined min-width="280px" max-width="280px" @click="showProductModal(product)">
                  <v-list-item>
                    <v-list-item-avatar class="mr-0">
                      <v-img :src="require(`~/assets/${product.image}.png`)" max-width="50" />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-card-title class="text-uppercase" style="word-break:normal;">
                        {{ product.name }}
                      </v-card-title>
                      <v-card-subtitle v-if="false">
                        {{ (product.price).toFixed(2) }} € HT
                      </v-card-subtitle>
                      <v-card-subtitle>{{ (product.price * product.tva).toFixed(2) }} € TTC</v-card-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
            <v-skeleton-loader
              v-else
              class="mx-auto"
              max-width="100"
              type="button"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="10" sm="1" md="2" class="mt-4 mb-4">
        <CartCard />
      </v-col>
      <ProductModal :product="selectedProduct" :show="productModal" @add-product="addProductHandler" @close="productModal = false" />
      <OrderTypeModal :show="orderTypeModal" @select-type="selectOrderType" @close="orderTypeModal = false" />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductModal from '../../components/ProductModal.vue'
import CartCard from '../../components/CartCard.vue'
import OrderTypeModal from '../../components/OrderTypeModal.vue'
export default {
  name: 'AccountPage',
  components: {
    ProductModal,
    CartCard,
    OrderTypeModal
  },
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  data: () => ({
    selectedCategorie: 0,
    productModal: false,
    orderTypeModal: true,
    selectedProduct: {
      name: 'Burger 1',
      price: 4.95
    }

  }),
  computed: {
    ...mapGetters({
      restaurant: 'restaurant/getRestaurant',
      loading: 'restaurant/isLoading',
      categorie: 'categorie/getCategorie',
      orderType: 'cart/getOrderType'
    })

  },
  created () {
    this.$store.commit('restaurant/setLoading', true)
  },
  mounted () {
    // récuper les info du restaurant

    this.$store.dispatch('restaurant/getRestaurant', this.$route.params.id)
  },
  methods: {
    selectOrderType (type) {
      console.log(type)
    },
    changeCategorie (categorie) {
      this.$store.dispatch('categorie/getCategorieById', categorie.id)
    },
    addProductHandler (data) {
      this.productModal = false
      this.$store.commit('cart/addProductToCart', { product: data.product, quantity: data.quantity })
    },
    showProductModal (product) {
      this.selectedProduct = product
      this.productModal = true
    }
  }
}
</script>
