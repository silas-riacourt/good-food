<template>
  <v-container fluid>
    <v-row justify="center" class="">
      <v-col cols="12" sm="12" md="11">
        <v-row no-gutters class="">
          <v-col cols="7" class="mt-2">
            <h1 class="font-weight-light">
              Nos restaurants
            </h1>
            <v-row align="center" class="mt-2">
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
            <div id="map-wrap" style="height: 100vh" class="d-none d-sm-block">
              <client-only>
                <l-map style="height: 100%" :zoom="zoom" :center="center" @ready="setIconStyles">
                  <l-tile-layer :url="url" :attribution="attribution" />
                  <l-marker v-for="(restaurant, index) in restaurants" :key="index" :lat-lng="restaurant.locationCoords" :icon="icon" @click="checkRestaurant(restaurant)" />
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
          locationName: 'BREST 29910 10 route test',
          open: true,
          locationCoords: [48.390392, -4.486076]
        },
        {
          name: 'GoodFood PARIS',
          locationName: 'PARIS Avenue des chams ',
          open: false,
          locationCoords: [48.856613, 2.352222]
        },
        {
          name: 'GoodFood RENNES',
          locationName: 'RENNES',
          open: true,
          locationCoords: [48.117268, -1.677793]
        },
        {
          name: 'GoodFood TOULOUSE',
          locationName: 'TOULOUSE',
          open: false,
          locationCoords: [43.604652, 1.444209]
        },
        {
          name: 'GoodFood GRENOBLE',
          locationName: 'adresse',
          open: false,
          locationCoords: [45.194260, 5.731670]
        },
        {
          name: 'GoodFood BRUXELLES',
          locationName: 'adresse',
          open: false,
          locationCoords: [50.8465573, 4.351697]
        },
        {
          name: 'GoodFood LUXEMBOURG',
          locationName: 'adresse',
          open: false,
          locationCoords: [49.8158683, 6.1296751]
        }
      ],
      url: 'https://api.mapbox.com/styles/v1/silass22/cl15fh7zt000d15lj8g5vger1/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2lsYXNzMjIiLCJhIjoiY2wxNWYwZ2pkMGplaDNic2dkbnFra2p1dyJ9.8QDRbHYvC4-FEvfG6W8R6Q', // https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 6,
      center: [47.1749, 2.185],
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
    checkRestaurant (restaurant) {
      console.log(restaurant)
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
