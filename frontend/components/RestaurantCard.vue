<template>
  <v-card class="grow" min-width="250px" max-width="250px">
    <v-card-title class="text-uppercase">
      {{ name }}
    </v-card-title>

    <v-card-subtitle>
      <v-icon :color="open ? 'green' : 'red'">
        {{ open ? "mdi-check" : "mdi-close" }}
      </v-icon>
      {{ open ? "Ouvert" : "Fermé" }} | 10 kms
    </v-card-subtitle>

    <v-card-text> BREST 29910 10 route test </v-card-text>

    <v-card-actions class="justify-center pb-4">
      <div class="text-center">
        <v-btn color="warning" :to="{ path: 'restaurant/'+id, params: { restaurantId: 123 }}" :nuxt="true">
          Commander
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RestaurantCard',
  props: {
    name: {
      type: String,
      default: 'GoodFood'
    },
    open: Boolean,
    location: {
      type: String,
      default: 'BREST'
    },
    id: {
      type: Number,
      default: 0
    }
  }
}
</script>
