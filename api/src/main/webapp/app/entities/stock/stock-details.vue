<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="stock">
        <h2 class="jh-entity-heading" data-cy="stockDetailsHeading"><span>Stock</span> {{ stock.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Quantity</span>
          </dt>
          <dd>
            <span>{{ stock.quantity }}</span>
          </dd>
          <dt>
            <span>Restaurant</span>
          </dt>
          <dd>
            <div v-if="stock.restaurant">
              <router-link :to="{ name: 'RestaurantView', params: { restaurantId: stock.restaurant.id } }">{{
                stock.restaurant.name
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Ingredient</span>
          </dt>
          <dd>
            <div v-if="stock.ingredient">
              <router-link :to="{ name: 'IngredientView', params: { ingredientId: stock.ingredient.id } }">{{
                stock.ingredient.name
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="stock.id" :to="{ name: 'StockEdit', params: { stockId: stock.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./stock-details.component.ts"></script>
