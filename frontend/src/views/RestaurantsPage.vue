<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title
          >Welcome to GoodFood choisissez votre restaurant pour
          commander!</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="5" size-sm="12">
            <div class="goodfood__header">
              <ion-searchbar
                mode="ios"
                ancel-button-icon
                placeholder="Brest.."
              ></ion-searchbar>
            </div>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col v-for="(restaurant, index) in this.restaurants" :key="index">
            <restaurant-card
              :name="restaurant.name"
              :open="restaurant.open"
              :location="restaurant.location"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCol,
  IonRow,
  IonGrid,
  IonSearchbar,
} from "@ionic/vue";
import RestaurantCard from "../components/RestaurantCard.vue";

export default {
  components: {
    RestaurantCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonRow,
    IonGrid,
    IonCol,
    IonSearchbar,
  },
  data() {
    return {
      restaurants: [
        {
          name: "GoodFood BREST",
          location: "BREST 29910 10 route test",
          open: true,
        },
        {
          name: "GoodFood PARIS",
          location: "PARIS Avenue des chams ",
          open: false,
        },
        {
          name: "GoodFood RENNES",
          location: "RENNES",
          open: true,
        },
        {
          name: "GoodFood TOULOUSE",
          location: "TOULOUSE",
          open: false,
        },
      ],
    };
  },
};
</script>
    RestaurantCard