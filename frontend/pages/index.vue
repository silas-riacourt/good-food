<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-row justify="center" align="center">
        <v-col v-for="(restaurant, index) in restaurants" :key="index">
          <RestaurantCard
            :name="restaurant.name"
            :open="restaurant.open"
            :location="restaurant.location"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <h1>ici une carte</h1>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',

  data () {
    return {
      restaurants: [
        {
          name: 'GoodFood BREST',
          location: 'BREST 29910 10 route test',
          open: true
        },
        {
          name: 'GoodFood PARIS',
          location: 'PARIS Avenue des chams ',
          open: false
        },
        {
          name: 'GoodFood RENNES',
          location: 'RENNES',
          open: true
        },
        {
          name: 'GoodFood TOULOUSE',
          location: 'TOULOUSE',
          open: false
        }
      ]
    }
  }
}
</script>
<style scoped>
.container {
  margin-left: 0!important;
}
</style>
