<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="ingredientOrder">
        <h2 class="jh-entity-heading" data-cy="ingredientOrderDetailsHeading"><span>IngredientOrder</span> {{ ingredientOrder.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Date</span>
          </dt>
          <dd>
            <span>{{ ingredientOrder.date }}</span>
          </dd>
          <dt>
            <span>Status</span>
          </dt>
          <dd>
            <span>{{ ingredientOrder.status }}</span>
          </dd>
          <dt>
            <span>Quantity</span>
          </dt>
          <dd>
            <span>{{ ingredientOrder.quantity }}</span>
          </dd>
          <dt>
            <span>Supplifier</span>
          </dt>
          <dd>
            <div v-if="ingredientOrder.supplifier">
              <router-link :to="{ name: 'SupplierView', params: { supplierId: ingredientOrder.supplifier.id } }">{{
                ingredientOrder.supplifier.name
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Ingredient</span>
          </dt>
          <dd>
            <div v-if="ingredientOrder.ingredient">
              <router-link :to="{ name: 'IngredientView', params: { ingredientId: ingredientOrder.ingredient.id } }">{{
                ingredientOrder.ingredient.name
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="ingredientOrder.id"
          :to="{ name: 'IngredientOrderEdit', params: { ingredientOrderId: ingredientOrder.id } }"
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

<script lang="ts" src="./ingredient-order-details.component.ts"></script>
