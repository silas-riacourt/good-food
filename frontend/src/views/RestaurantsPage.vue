<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Welcome to GoodFood choisissez votre restaurant pour commander!</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Restaurants</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid>
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
  IonGrid
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
    IonRow,IonGrid,IonCol
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
      ],
    };
  },
};
</script>
    RestaurantCard