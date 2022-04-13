<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="8">
        <h1 class="font-weight-light">
          Mon compte
        </h1>

        <v-text-field v-model="$auth.user.lastName" label="Nom" />

        <v-text-field v-model="$auth.user.firstName" label="Prénom" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AccountPage'
}
</script>
