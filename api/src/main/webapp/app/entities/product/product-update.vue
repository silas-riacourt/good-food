<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.product.home.createOrEditLabel" data-cy="ProductCreateUpdateHeading">Create or edit a Product</h2>
        <div>
          <div class="form-group" v-if="product.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="product.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="product-name"
              data-cy="name"
              :class="{ valid: !$v.product.name.$invalid, invalid: $v.product.name.$invalid }"
              v-model="$v.product.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="product-description"
              data-cy="description"
              :class="{ valid: !$v.product.description.$invalid, invalid: $v.product.description.$invalid }"
              v-model="$v.product.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-price">Price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="product-price"
              data-cy="price"
              :class="{ valid: !$v.product.price.$invalid, invalid: $v.product.price.$invalid }"
              v-model.number="$v.product.price.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-image">Image</label>
            <input
              type="text"
              class="form-control"
              name="image"
              id="product-image"
              data-cy="image"
              :class="{ valid: !$v.product.image.$invalid, invalid: $v.product.image.$invalid }"
              v-model="$v.product.image.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-tva">Tva</label>
            <input
              type="number"
              class="form-control"
              name="tva"
              id="product-tva"
              data-cy="tva"
              :class="{ valid: !$v.product.tva.$invalid, invalid: $v.product.tva.$invalid }"
              v-model.number="$v.product.tva.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-tvaTakeAway">Tva Take Away</label>
            <input
              type="number"
              class="form-control"
              name="tvaTakeAway"
              id="product-tvaTakeAway"
              data-cy="tvaTakeAway"
              :class="{ valid: !$v.product.tvaTakeAway.$invalid, invalid: $v.product.tvaTakeAway.$invalid }"
              v-model.number="$v.product.tvaTakeAway.$model"
            />
          </div>
          <div class="form-group">
            <label for="product-ingredient">Ingredient</label>
            <select
              class="form-control"
              id="product-ingredients"
              data-cy="ingredient"
              multiple
              name="ingredient"
              v-if="product.ingredients !== undefined"
              v-model="product.ingredients"
            >
              <option
                v-bind:value="getSelected(product.ingredients, ingredientOption)"
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
            :disabled="$v.product.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-update.component.ts"></script>
