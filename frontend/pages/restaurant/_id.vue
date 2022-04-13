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
                <v-card outlined min-width="200px" max-width="200px">
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
              <h4> 13,01€</h4>
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
            <p class="font-weight-bold">
              MENU BEST OF™
            </p>
            <p>CBO™<br>MOYENNE FRITE<br>PÉTILLANTE 40CL</p>
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
                1
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
                12.98€
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AccountPage',
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  data: () => ({
    selectedCategorie: 0,
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
          }

        ]
      },
      {
        id: 2,
        name: 'Catégorie 2',
        image: 'menu'
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
        id: 5,
        name: 'Catégorie 5',
        image: 'menu'
      },
      {
        id: 6,
        name: 'Nos burgers',
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
    console.log(this.$route.params)
  }
}
</script>
