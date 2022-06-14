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
            <h1>GoodFood LOUDEAC</h1>
            <p><v-icon>mdi-table-chair</v-icon> Sur place </p>
          </v-col>
        </v-row>
        <v-divider />
        <v-row class="mt-4 mb-4">
          <v-col cols="12" sm="4" md="4">
            <v-list>
              <v-list-item-group v-model="selectedCategorie" mandatory color="warning">
                <v-list-item
                  v-for="(item) in categories"
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
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <h2>{{ categories[selectedCategorie].name }}</h2>
            <v-row class="mt-2">
              <v-col v-for="(product,i) in categories[selectedCategorie].products" :key="i" cols="auto">
                <v-card outlined min-width="200px" max-width="200px" @click="showProductModal(product)">
                  <v-list-item>
                    <v-list-item-avatar class="mr-0">
                      <v-img :src="require(`~/assets/dessert.png`)" max-width="50" />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-card-title class="text-uppercase">
                        {{ product.name }}
                      </v-card-title>
                      <v-card-subtitle>{{ product.price }} €</v-card-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="1" md="2" class="mt-4 mb-4">
        <CartCard />
      </v-col>
      <ProductModal :product="selectedProduct" :show="productModal" @add-product="addProductHandler" />
    </v-row>
  </v-container>
</template>

<script>
import ProductModal from '../../components/ProductModal.vue'
import CartCard from '../../components/CartCard.vue'
export default {
  name: 'AccountPage',
  components: {
    ProductModal,
    CartCard
  },
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  data: () => ({
    selectedCategorie: 0,
    productModal: false,
    selectedProduct: {
      name: 'Burger 1',
      price: 4.95
    },
    categories: [
      {
        id: 1,
        name: 'Nos menus',
        image: 'menu',
        products: [
          {
            name: 'Menu 1',
            price: 8.95
          },
          {
            name: 'Menu 2',
            price: 8.95
          },
          {
            name: 'Menu 3',
            price: 8.95
          },
          {
            name: 'Menu 4',
            price: 10
          }

        ]
      },
      {
        id: 2,
        name: 'Nos burgers',
        image: 'menu',
        products: [
          {
            name: 'Burger 1',
            price: 4.95,
            image: 'burger_1',
            description: 'description'
          },
          {
            name: 'Burger 2',
            price: 3,
            image: 'burger_2',
            description: 'description'
          }
        ]
      },
      {
        id: 3,
        name: 'Catégorie 3',
        image: 'menu'
      },
      {
        id: 4,
        name: 'Catégorie 4',
        image: 'menu'
      },
      {
        id: 7,
        name: 'Nos desserts',
        image: 'dessert'
      }
    ]
  }),
  created () {

  },
  mounted () {
    console.log(this.$route.params)
  },
  methods: {
    addProductHandler (data) {
      console.log(data)
      this.productModal = false
    },
    showProductModal (product) {
      this.selectedProduct = product
      this.productModal = true
    }
  }
}
</script>
