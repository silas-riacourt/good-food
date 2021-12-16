<template>

    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/">
             <ion-icon :icon="restaurantOutline" />
          <ion-label>Restaurants</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/produits">
          <ion-icon :icon="cartOutline" />
          <ion-label>Commander</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/account">
          <ion-icon :icon="personOutline" />
          <ion-label>Compte</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/vue';
import { personOutline, restaurantOutline,cartOutline} from 'ionicons/icons';

export default {
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonRouterOutlet },
  setup() {
    return {
      personOutline, 
      restaurantOutline,
      cartOutline
    }
  }
}
</script>