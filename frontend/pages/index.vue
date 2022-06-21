<template>
  <v-container fluid>
    <v-row justify="center" class="">
      <v-col cols="12" sm="12" md="12" class="pa-0">
        <v-row no-gutters justify="center">
          <v-col cols="12" xs="12" lg="6" class="pt-2  elevation-0" style="z-index:1">
            <h1 class="font-weight-light pl-4">
              Nos restaurants
            </h1>
            <v-row justify="center" class="pt-2 pb-2 ">
              <v-col cols="10" xs="10" lg="8">
                <v-autocomplete
                  v-model="search"
                  chips
                  color="warning"
                  clearable
                  filled
                  rounded
                  solo
                  label="Choisir une ville"
                  hide-details
                  :items="items"
                  no-data-text="Désolé nous ne sommes pas encore présent dans cette ville"
                />
              </v-col>
            </v-row>
            <v-row v-if="!loading" align="center" class="mt-2 pa-2" justify="center">
              <v-col v-for="(restaurant, index) in filterRestaurant" :key="index" cols="auto">
                <RestaurantCard
                  :id="restaurant.id"
                  :name="restaurant.name"
                  :open="restaurant.open"
                  :location="restaurant.location"
                  :locationname="restaurant.locationName"
                  :schedule="restaurant.schedule"
                  :selected="false"
                />
              </v-col>
            </v-row>
            <v-row v-else align="center" class="mt-2" justify="center">
              <v-col v-for="index in 4" :key="index" cols="auto">
                <v-skeleton-loader
                  class="mx-auto"
                  width="300"
                  type="card"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <div id="map-wrap" style="height: 100vh" class="d-none d-sm-block">
              <client-only>
                <l-map
                  ref="map"
                  :options="{zoomControl: false}"
                  style="height: 100%;z-index:0;"
                  :zoom="zoom"
                  :center="center"
                  @ready="setIconStyles"
                >
                  <l-tile-layer :url="url" :attribution="attribution" />
                  <l-marker
                    v-for="(restaurant, index) in filterRestaurant"
                    :key="index"
                    :lat-lng="[restaurant.locationLat,restaurant.locationLng]"
                    :icon="icon"
                    @mouseenter="checkRestaurant(restaurant)"
                    @mouseleave="uncheckRestaurant(restaurant)"
                  >
                    <l-popup style="margin:0px">
                      <RestaurantCard
                        :id="restaurant.id"
                        :name="restaurant.name"
                        :open="restaurant.open"
                        :location="restaurant.location"
                        :locationname="restaurant.locationName"
                        :schedule="restaurant.schedule"
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
import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  auth: false,
  data () {
    return {
      url: 'https://api.mapbox.com/styles/v1/silass22/cl15fh7zt000d15lj8g5vger1/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2lsYXNzMjIiLCJhIjoiY2wxNWYwZ2pkMGplaDNic2dkbnFra2p1dyJ9.8QDRbHYvC4-FEvfG6W8R6Q', // https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 6,
      center: [47.1749, 2.185],
      iconSize: 40,
      icon: null,
      items: ['Toutes les villes', 'Brest', 'Paris', 'Rennes', 'LUXEMBOURG', 'BRUXELLES'],
      search: 'Toutes les villes'
    }
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.0]
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15]
    },
    filterRestaurant () {
      if (this.search != null && this.search !== '' && this.search !== 'Toutes les villes') {
        return this.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        return this.restaurants
      }
    },
    ...mapGetters({
      restaurants: 'restaurant/getAll',
      loading: 'restaurant/isLoading'
    })
  },
  mounted () {
    this.$store.dispatch('restaurant/getRestaurants')
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
      // this.restaurants[this.restaurants.indexOf(restaurant)].open = true
    },
    uncheckRestaurant (restaurant) {
      // this.restaurants[this.restaurants.indexOf(restaurant)].open = false
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
.leaflet-popup-content {
    margin:0;
    }

</style>
