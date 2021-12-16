<template>
  <ion-app>
    <ion-router-outlet />
    <navigation-tabs/>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import NavigationTabs from './views/NavigationTabs.vue';
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    NavigationTabs
  }
});
</script>
    NavigationTabs