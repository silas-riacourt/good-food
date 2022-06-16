<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="ingredient">
        <h2 class="jh-entity-heading" data-cy="ingredientDetailsHeading"><span>Ingredient</span> {{ ingredient.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ ingredient.name }}</span>
          </dd>
          <dt>
            <span>Quantity</span>
          </dt>
          <dd>
            <span>{{ ingredient.quantity }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="ingredient.id"
          :to="{ name: 'IngredientEdit', params: { ingredientId: ingredient.id } }"
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

<script lang="ts" src="./ingredient-details.component.ts"></script>
