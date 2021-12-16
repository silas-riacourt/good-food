<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ name }}</ion-card-title>
      <ion-card-subtitle>{{ location }}</ion-card-subtitle>
      <ion-card-subtitle
        ><ion-icon
          :icon="ellipse"
          :class="open ? 'open-icon' : 'close-icon'"
        ></ion-icon>
        {{open ? 'Ouvert' : 'Fermé'}} 10kms</ion-card-subtitle
      >
    </ion-card-header>

    <ion-card-content>
      <div class="ion-text-center">
        <ion-button color="warning" >Commander</ion-button>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { ellipse } from "ionicons/icons";
import { IonCard , IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon ,IonButton,IonCardContent } from '@ionic/vue';

export default {
  components: { IonCard , IonCardHeader, IonCardTitle, IonCardSubtitle,IonIcon, IonButton, IonCardContent},
  setup() {
    return {
      ellipse,
    };
  },
  name: "RestaurantCard",
  props: {
    name: String,
    open: Boolean,
    location: String,
  },
};
</script>

<style scoped>
.open-icon {
  color: lightgreen;
}
.close-icon {
  color: red;
}
</style>