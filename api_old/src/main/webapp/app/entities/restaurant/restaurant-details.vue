<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="restaurant">
        <h2 class="jh-entity-heading" data-cy="restaurantDetailsHeading"><span>Restaurant</span> {{ restaurant.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ restaurant.name }}</span>
          </dd>
          <dt>
            <span>Location Name</span>
          </dt>
          <dd>
            <span>{{ restaurant.locationName }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ restaurant.description }}</span>
          </dd>
          <dt>
            <span>Schedule</span>
          </dt>
          <dd>
            <span>{{ restaurant.schedule }}</span>
          </dd>
          <dt>
            <span>Open</span>
          </dt>
          <dd>
            <span>{{ restaurant.open }}</span>
          </dd>
          <dt>
            <span>Location Lat</span>
          </dt>
          <dd>
            <span>{{ restaurant.locationLat }}</span>
          </dd>
          <dt>
            <span>Location Lng</span>
          </dt>
          <dd>
            <span>{{ restaurant.locationLng }}</span>
          </dd>
          <dt>
            <span>Categorie</span>
          </dt>
          <dd>
            <span v-for="(categorie, i) in restaurant.categories" :key="categorie.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'CategorieView', params: { categorieId: categorie.id } }">{{ categorie.name }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="restaurant.id"
          :to="{ name: 'RestaurantEdit', params: { restaurantId: restaurant.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./restaurant-details.component.ts"></script>
