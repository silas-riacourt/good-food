<template>
  <v-container>
    <v-row justify="center" class="">
      <v-col cols="12" sm="11" md="11" offset="1">
        <v-row no-gutters class="">
          <v-col cols="7" class="mt-4">
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
            <h1 class="font-weight-light">
              Nos restaurants
            </h1>
            <div id="map-wrap" style="height: 100vh">
              <client-only>
                <l-map style="height: 100%" :zoom="zoom" :center="center" @ready="setIconStyles">
                  <l-tile-layer :url="url" :attribution="attribution" />
                  <l-marker :lat-lng="markerLatLng" :icon="icon" @click="checkRestaurant()" />
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
      url: 'https://api.mapbox.com/styles/v1/silass22/cl15fh7zt000d15lj8g5vger1/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2lsYXNzMjIiLCJhIjoiY2wxNWYwZ2pkMGplaDNic2dkbnFra2p1dyJ9.8QDRbHYvC4-FEvfG6W8R6Q', // https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 6,
      center: [47.1749, 2.185],
      markerLatLng: [47.413220, -1.199482],
      accessToken: '',
      iconSize: 40,
      icon: null
    }
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.0]
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15]
    }
  },
  methods: {
    checkRestaurant () {
      console.log('hover')
    },
    setIconStyles () {
      this.icon = this.$L.icon({
        iconUrl: 'restaurant.png',
        iconSize: this.dynamicSize,
        iconAnchor: this.dynamicAnchor
      })
    }
  }
}
</script>
<style scoped>
.container {
  margin-left: 0!important;
}
</style>
