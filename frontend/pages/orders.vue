<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="8">
        <h1 class="font-weight-light">
          Mes commandes
        </h1>
      </v-col>
      <v-col cols="8">
        <h2 class="font-weight-light">
          Suivi de mes commandes
        </h2>
        <v-data-table
          :headers="headers"
          :items="orders"
          :items-per-page="10"
          :sort-by="['date', 'status']"
          :sort-desc="[true, true]"
        >
          <template #[`item.status`]="{ item }">
            <v-chip :color="getColorBystatus(item.status)" outlined>
              {{ getTextBystatus(item.status) }}
            </v-chip>
          </template>
          <template #[`item.id`]="{ item }">
            <v-icon @click="orderDetails(item)">
              mdi-chevron-right
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <OrderModal :order="selectedOrder" :show="orderModal" @close="orderModal = false" />
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
      orders: [
        {
          id: 10,
          totalPrice: 67206,
          date: '2022-06-15',
          status: 'CANCELED',
          paymentMethod: 'CREDITCARD',
          restaurant: null,
          productOrders: null,
          client: null
        },
        {
          id: 1001,
          totalPrice: 30,
          date: '2022-06-15',
          status: 'ENDED',
          paymentMethod: 'PAYPAL',
          restaurant: {
            id: 10,
            name: 'GoodFood BREST',
            locationName: 'a brest lol',
            description: 'Grocery',
            schedule: 'OUVERT H24 FRERE',
            open: false,
            locationLat: 48.390392,
            locationLng: -4.486076
          },
          productOrders: null,
          client: {
            id: 2,
            fullname: 'XSS',
            firstName: 'Odette',
            lastName: 'Vidal',
            phone: '0669204579',
            mail: 'hard'
          }
        },
        {
          id: 2,
          totalPrice: 74309,
          date: '2022-06-14',
          status: 'CANCELED',
          paymentMethod: 'PAYPAL',
          restaurant: null,
          productOrders: null,
          client: null
        },
        {
          id: 6,
          totalPrice: 77186,
          date: '2022-06-15',
          status: 'ENDED',
          paymentMethod: 'CREDITCARD',
          restaurant: null,
          productOrders: null,
          client: null
        },
        {
          id: 9,
          totalPrice: 17935,
          date: '2022-06-14',
          status: 'ENDED',
          paymentMethod: 'CREDITCARD',
          restaurant: null,
          productOrders: null,
          client: null
        },
        {
          id: 5,
          totalPrice: 20742,
          date: '2022-06-14',
          status: 'IN_PROGRESS',
          paymentMethod: 'PAYPAL',
          restaurant: null,
          productOrders: null,
          client: null
        },
        {
          id: 4,
          totalPrice: 57039,
          date: '2022-06-14',
          status: 'IN_PROGRESS',
          paymentMethod: 'PAYPAL',
          restaurant: null,
          productOrders: null,
          client: null
        },
        {
          id: 8,
          totalPrice: 96360,
          date: '2022-06-14',
          status: 'CANCELED',
          paymentMethod: 'CREDITCARD',
          restaurant: null,
          productOrders: null,
          client: null
        },
        {
          id: 3,
          totalPrice: 34818,
          date: '2022-06-14',
          status: 'ENDED',
          paymentMethod: 'PAYPAL',
          restaurant: null,
          productOrders: null,
          client: null
        },
        {
          id: 1,
          totalPrice: 48469,
          date: '2022-06-15',
          status: 'CANCELED',
          paymentMethod: 'PAYPAL',
          restaurant: null,
          productOrders: null,
          client: null
        },
        {
          id: 7,
          totalPrice: 39702,
          date: '2022-06-15',
          status: 'CANCELED',
          paymentMethod: 'CREDITCARD',
          restaurant: null,
          productOrders: null,
          client: null
        }
      ],
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
        }, {
          text: 'Détail',
          align: 'start',
          sortable: false,
          value: 'id'
        }
      ]
    }
  },
  mounted () {
    this.getClientId()
    setTimeout(
      function () {

      }, 5000)
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
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => { this.loading = false })
    }
  }

}
</script>
