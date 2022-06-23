<template>
  <v-card
    class="grow"
    min-width="290px"
    max-width="290px"
    max-height="220px"
    min-height="220px"
    :color="selected ? '' :''"
    :dark="selected"
    :elevation="fromMap ? '0' : '2'"
  >
    <v-card-title class="text-uppercase" style="font-size: 1.10rem;">
      <v-icon left>
        mdi-silverware-fork-knife
      </v-icon>
      {{ name }}
    </v-card-title>

    <v-card-subtitle>
      <v-icon :color="open ? 'green' : 'red'">
        {{ open ? "mdi-check" : "mdi-close" }}
      </v-icon>
      {{ open ? "Ouvert" : "Fermé" }}
    </v-card-subtitle>

    <v-card-text class="pb-0">
      {{ locationname }}
      <br>
      <small>{{ schedule }}</small>
    </v-card-text>

    <v-card-actions class="justify-center pb-4">
      <div class="text-center">
        <v-btn color="warning" :to="{ path: 'restaurant/'+id, params: { restaurantId: 123 }}" :nuxt="true" :disabled="!open">
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
    locationname: {
      type: String,
      required: true
    },
    schedule: {
      type: String,
      default: 'horaires'
    },
    id: {
      type: Number,
      default: 0
    },
    selected: Boolean,
    fromMap: Boolean
  },
  methods: {
  }
}
</script>
