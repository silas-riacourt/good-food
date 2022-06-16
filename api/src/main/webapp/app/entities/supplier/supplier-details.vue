<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="supplier">
        <h2 class="jh-entity-heading" data-cy="supplierDetailsHeading"><span>Supplier</span> {{ supplier.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ supplier.name }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ supplier.description }}</span>
          </dd>
          <dt>
            <span>Number</span>
          </dt>
          <dd>
            <span>{{ supplier.number }}</span>
          </dd>
          <dt>
            <span>Address</span>
          </dt>
          <dd>
            <span>{{ supplier.address }}</span>
          </dd>
          <dt>
            <span>Ingredient</span>
          </dt>
          <dd>
            <div v-if="supplier.ingredient">
              <router-link :to="{ name: 'IngredientView', params: { ingredientId: supplier.ingredient.id } }">{{
                supplier.ingredient.name
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="supplier.id" :to="{ name: 'SupplierEdit', params: { supplierId: supplier.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./supplier-details.component.ts"></script>
