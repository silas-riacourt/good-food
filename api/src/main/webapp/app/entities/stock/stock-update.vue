<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.stock.home.createOrEditLabel" data-cy="StockCreateUpdateHeading">Create or edit a Stock</h2>
        <div>
          <div class="form-group" v-if="stock.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="stock.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="stock-quantity">Quantity</label>
            <input
              type="number"
              class="form-control"
              name="quantity"
              id="stock-quantity"
              data-cy="quantity"
              :class="{ valid: !$v.stock.quantity.$invalid, invalid: $v.stock.quantity.$invalid }"
              v-model.number="$v.stock.quantity.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="stock-restaurant">Restaurant</label>
            <select class="form-control" id="stock-restaurant" data-cy="restaurant" name="restaurant" v-model="stock.restaurant">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="stock.restaurant && restaurantOption.id === stock.restaurant.id ? stock.restaurant : restaurantOption"
                v-for="restaurantOption in restaurants"
                :key="restaurantOption.id"
              >
                {{ restaurantOption.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="stock-ingredient">Ingredient</label>
            <select class="form-control" id="stock-ingredient" data-cy="ingredient" name="ingredient" v-model="stock.ingredient">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="stock.ingredient && ingredientOption.id === stock.ingredient.id ? stock.ingredient : ingredientOption"
                v-for="ingredientOption in ingredients"
                :key="ingredientOption.id"
              >
                {{ ingredientOption.name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.stock.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./stock-update.component.ts"></script>
