<template>
  <v-container fluid>
    <v-row justify="center" class="">
      <v-col cols="12" sm="12" md="12" class="pa-0">
        <v-row no-gutters>
          <v-col class="pt-4 pl-8 elevation-0" style="z-index:10">
            <h1 class="font-weight-light">
              Nos restaurants
            </h1>
            <v-row align="center" class="mt-2" justify="center">
              <v-col v-for="(restaurant, index) in restaurants" :key="index" cols="auto">
                <RestaurantCard
                  :name="restaurant.name"
                  :open="restaurant.open"
                  :location="restaurant.location"
                  :locationname="restaurant.locationName"
                  :selected="false"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <div id="map-wrap" style="height: 100vh" class="d-none d-sm-block">
              <client-only>
                <l-map :options="{zoomControl: false}" style="height: 100%;z-index:0;" :zoom="zoom" :center="center" @ready="setIconStyles">
                  <l-tile-layer :url="url" :attribution="attribution" />
                  <l-marker
                    v-for="(restaurant, index) in restaurants"
                    :key="index"
                    :lat-lng="[restaurant.locationLat,restaurant.locationLng]"

                    :icon="icon"
                    @mouseenter="checkRestaurant(restaurant)"
                    @mouseleave="uncheckRestaurant(restaurant)"
                  >
                    <l-popup>
                      <RestaurantCard
                        :name="restaurant.name"
                        :open="restaurant.open"
                        :location="restaurant.location"
                        :locationname="restaurant.locationName"
                        :selected="false"
                        :from-map="true"
                      />
                    </l-popup>
                  </l-marker>
                  <l-control position="topleft">
                    <v-toolbar
                      dense
                      floating
                    >
                      <v-text-field
                        v-if="false"
                        hide-details
                        prepend-icon="mdi-magnify"
                        single-line
                      />

                      <v-btn icon @click="locatorButtonPressed()">
                        <v-icon>mdi-crosshairs-gps</v-icon>
                      </v-btn>
                    </v-toolbar>
                  </l-control>
                  <l-control-zoom position="bottomright" />
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
          open: false,
          locationLat: 48.390392,
          locationLng: -4.486076
        },
        {
          name: 'GoodFood PARIS',
          locationName: 'PARIS Avenue des chams ',
          open: false,
          locationCoords: [48.856613, 2.352222],
          locationLat: 48.390392,
          locationLng: -4.486076
        },
        {
          name: 'GoodFood RENNES',
          locationName: 'RENNES location address',
          open: false,
          locationCoords: [48.117268, -1.677793],
          locationLat: 48.390392,
          locationLng: -4.486076
        },
        {
          name: 'GoodFood TOULOUSE',
          locationName: 'TOULOUSE location address',
          open: false,
          locationCoords: [43.604652, 1.444209],
          locationLat: 48.390392,
          locationLng: -4.486076
        },
        {
          name: 'GoodFood GRENOBLE',
          locationName: 'adresse',
          open: false,
          locationCoords: [45.194260, 5.731670],
          locationLat: 48.390392,
          locationLng: -4.486076
        },
        {
          name: 'GoodFood BRUXELLES',
          locationName: 'adresse',
          open: false,
          locationCoords: [50.8465573, 4.351697],
          locationLat: 48.390392,
          locationLng: -4.486076
        },
        {
          name: 'GoodFood LUXEMBOURG',
          locationName: 'adresse',
          open: false,
          locationCoords: [49.8158683, 6.1296751],
          locationLat: 48.390392,
          locationLng: -4.486076
        }
      ],
      url: 'https://api.mapbox.com/styles/v1/silass22/cl15fh7zt000d15lj8g5vger1/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2lsYXNzMjIiLCJhIjoiY2wxNWYwZ2pkMGplaDNic2dkbnFra2p1dyJ9.8QDRbHYvC4-FEvfG6W8R6Q', // https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 6,
      center: [47.1749, 2.185],
      latTest: 48.390392,
      lngTest: -4.486076,
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
  mounted () {
    this.getRestaurants()
  },
  methods: {
    locatorButtonPressed () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = [position.coords.latitude, position.coords.longitude]
          this.zoom = 7
        },
        (error) => {
          console.log(error.message)
        }
      )
    },
    checkRestaurant (restaurant) {
      this.restaurants[this.restaurants.indexOf(restaurant)].open = true
    },
    uncheckRestaurant (restaurant) {
      this.restaurants[this.restaurants.indexOf(restaurant)].open = false
    },
    setIconStyles () {
      this.icon = this.$L.icon({
        iconUrl: 'restaurant.png',
        iconSize: this.dynamicSize,
        iconAnchor: this.dynamicAnchor
      })
    },
    async getRestaurants () {
      const restaurants = await this.$axios.$get('/api/restaurants')
      this.restaurants = restaurants
    }
  }
}
</script>
<style scoped>
.container {
  margin-left: 0!important;
}
</style>
