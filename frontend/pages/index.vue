<template>
  <v-container>
    <v-row justify="center" class="mt-4">
      <v-col cols="12" sm="10" md="10">
        <v-row no-gutters class="">
          <v-col cols="7">
            <v-row align="center">
              <v-col v-for="(restaurant, index) in restaurants" :key="index" cols="auto">
                <RestaurantCard
                  :name="restaurant.name"
                  :open="restaurant.open"
                  :location="restaurant.location"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="5">
            <h1>ici une carte</h1>
            <div id="map-wrap" style="height: 100vh">
              <client-only>
                <l-map style="height: 600px" :zoom="zoom" :center="center">
                  <l-tile-layer :url="url" :attribution="attribution" />
                  <l-marker :lat-lng="markerLatLng" />
                </l-map>
              </client-only>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
      ],
      url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 6,
      center: [47.8544329, 2.7601215],
      markerLatLng: [51.504, -0.159]
    }
  }
}
</script>
<style scoped>
.container {
  margin-left: 0!important;
}
</style>
