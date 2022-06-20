<template>
  <div class="home row justify-center">
    <div class="col-md-6">
      <h1 class="display-4">GoodFood ERP</h1>
      <p class="lead">L'interface pour gérer vos restaurants, vos clients ainsi que vos fournisseurs</p>

      <div class="d-flex justify-content-start mb-4" v-if="authenticated">
        <router-link to="/restaurant" custom v-slot="{ navigate }" class="mr-2">
          <button @click="navigate" class="btn btn-primary jh-create-entity create-categorie">
            <span> Gestion restaurants </span>
          </button>
        </router-link>
        <router-link to="/product" custom v-slot="{ navigate }" class="mr-2">
          <button @click="navigate" class="btn btn-primary jh-create-entity create-categorie">
            <span> Gestion produits </span>
          </button>
        </router-link>
        <router-link to="/ingredient" custom v-slot="{ navigate }" class="mr-2">
          <button @click="navigate" class="btn btn-primary jh-create-entity create-categorie">
            <span> Gestion ingrédients </span>
          </button>
        </router-link>
        <router-link to="/categorie" custom v-slot="{ navigate }" class="mr-2">
          <button @click="navigate" class="btn btn-primary jh-create-entity create-categorie">
            <span> Gestion catégories </span>
          </button>
        </router-link>
      </div>
      <div class="d-flex justify-content-start mb-4" v-if="authenticated">
        <router-link to="/order" custom v-slot="{ navigate }" class="mr-2">
          <button @click="navigate" class="btn btn-success jh-create-entity create-categorie">
            <span> Commandes clients </span>
          </button>
        </router-link>
        <router-link to="/client" custom v-slot="{ navigate }" class="mr-2">
          <button @click="navigate" class="btn btn-success jh-create-entity create-categorie">
            <span> Gestion clients </span>
          </button>
        </router-link>
        <router-link to="/product-order" custom v-slot="{ navigate }" class="mr-2">
          <button @click="navigate" class="btn btn-success jh-create-entity create-categorie">
            <span> Produits à préparer </span>
          </button>
        </router-link>
      </div>
      <div class="d-flex justify-content-start mb-4" v-if="authenticated">
        <router-link to="/supplier" custom v-slot="{ navigate }" class="mr-2">
          <button @click="navigate" class="btn btn-info jh-create-entity create-categorie">
            <span> Gestion fournisseurs </span>
          </button>
        </router-link>
        <router-link to="/stock" custom v-slot="{ navigate }" class="mr-2">
          <button @click="navigate" class="btn btn-info jh-create-entity create-categorie">
            <span> Gestion des stocks </span>
          </button>
        </router-link>
        <router-link to="/ingredient-order" custom v-slot="{ navigate }" class="mr-2">
          <button @click="navigate" class="btn btn-info jh-create-entity create-categorie">
            <span> Commandes ingrédients </span>
          </button>
        </router-link>
      </div>
      <div class="d-flex justify-content-start mb-4" v-if="authenticated">
        <router-link to="/manager" custom v-slot="{ navigate }" class="mr-2">
          <button @click="navigate" class="btn btn-primary jh-create-entity create-categorie">
            <span> Gestion des managers </span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
