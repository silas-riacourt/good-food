<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="menu">
        <h2 class="jh-entity-heading" data-cy="menuDetailsHeading"><span>Menu</span> {{ menu.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ menu.name }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ menu.description }}</span>
          </dd>
          <dt>
            <span>Price</span>
          </dt>
          <dd>
            <span>{{ menu.price }}</span>
          </dd>
          <dt>
            <span>Image</span>
          </dt>
          <dd>
            <span>{{ menu.image }}</span>
          </dd>
          <dt>
            <span>Restaurant</span>
          </dt>
          <dd>
            <span v-for="(restaurant, i) in menu.restaurants" :key="restaurant.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'RestaurantView', params: { restaurantId: restaurant.id } }">{{ restaurant.id }}</router-link>
            </span>
          </dd>
          <dt>
            <span>Categorie</span>
          </dt>
          <dd>
            <div v-if="menu.categorie">
              <router-link :to="{ name: 'CategorieView', params: { categorieId: menu.categorie.id } }">{{ menu.categorie.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="menu.id" :to="{ name: 'MenuEdit', params: { menuId: menu.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./menu-details.component.ts"></script>
