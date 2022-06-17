<template>
  <v-app dark>
    <v-row align="center" justify="center" class="mb-10">
      <v-col cols="6" class="text-center">
        <h1>
          ERREUR
        </h1>
        <h4>Impossible d'accéder à cette page</h4>
        <NuxtLink to="/">
          Retour
        </NuxtLink>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
