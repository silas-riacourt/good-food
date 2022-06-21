<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <h1 class="font-weight-light">
          Mes commandes
        </h1>
      </v-col>
      <v-col cols="12" sm="8">
        <v-data-table
          :headers="headers"
          :items="orders"
          :items-per-page="10"
          :sort-by="['date', 'status']"
          :sort-desc="[true, true]"
          no-data-text="Vous n'avez pas encore de commande"
        >
          <template #[`item.status`]="{ item }">
            <v-chip :color="getColorBystatus(item.status)" outlined>
              {{ getTextBystatus(item.status) }}
            </v-chip>
          </template>
          <template #[`item.date`]="{ item }">
            {{ new Date(item.date).toLocaleDateString() }}
          </template>
          <template #[`item.paymentMethod`]="{ item }">
            <div v-if="item.paymentMethod === 'PAYPAL'">
              <v-icon>mdi-web</v-icon> Paypal
            </div>
            <div v-else>
              <v-icon>mdi-credit-card</v-icon> Carte de crédit
            </div>
          </template>
          <template #[`item.totalPrice`]="{ item }">
            {{ item.totalPrice }} €
          </template>
          <template #[`item.id`]="{ item }">
            <v-icon @click="orderDetails(item)">
              mdi-chevron-right
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <OrderModal v-if="orderModal" :order="selectedOrder" :products="filterProductOrders" :show="orderModal" @close="orderModal = false" />
  </v-container>
</template>

<script>
export default {
  name: 'OrderPage',
  data () {
    return {
      client: 0,
      selectedOrder: {},
      orderModal: false,
      productOrders: [],
      orders: [],
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'date'
        }, {
          text: 'Restaurant',
          align: 'start',
          sortable: false,
          value: 'restaurant.name'
        }, {
          text: 'Prix',
          align: 'start',
          sortable: false,
          value: 'totalPrice'
        }, {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'status'
        },
        {
          text: 'Mode réglement',
          align: 'start',
          sortable: false,
          value: 'paymentMethod'
        },
        {
          text: 'Détail',
          align: 'start',
          sortable: false,
          value: 'id'
        }
      ]
    }
  },
  computed: {
    filterProductOrders () {
      return this.productOrders.filter(product => product.order.id === this.selectedOrder.id)
    }
  },
  mounted () {
    this.getClientId()
  },
  methods: {
    getColorBystatus (status) {
      switch (status) {
        case 'CANCELED':
          return 'red'
        case 'ENDED':
          return 'green'
        case 'IN_PROGRESS':
          return 'warning'
        default:
          return 'black'
      }
    },
    getTextBystatus (status) {
      switch (status) {
        case 'CANCELED':
          return 'Annulée'
        case 'ENDED':
          return 'Terminée'
        case 'IN_PROGRESS':
          return 'En cours de préparation'
        default:
          return 'black'
      }
    },
    orderDetails (order) {
      this.selectedOrder = order
      this.orderModal = true
    },
    getClientId () {
      this.$axios.$get('/api/clients/by-user-id/' + this.$auth.user.id)
        .then((response) => {
          this.client = response
          this.getOrders()
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => { this.loading = false })
    },
    getOrders () {
      this.$axios.$get('/api/orders/by-user-id/' + this.client.id)
        .then((response) => {
          this.orders = response
          this.getProductOders()
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => { this.loading = false })
    },
    getProductOders () {
      this.$axios.$get('/api/product-orders')
        .then((response) => {
          this.productOrders = response
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => { this.loading = false })
    }

  }

}
</script>
