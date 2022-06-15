<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.ingredient.home.createOrEditLabel" data-cy="IngredientCreateUpdateHeading">Create or edit a Ingredient</h2>
        <div>
          <div class="form-group" v-if="ingredient.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="ingredient.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="ingredient-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="ingredient-name"
              data-cy="name"
              :class="{ valid: !$v.ingredient.name.$invalid, invalid: $v.ingredient.name.$invalid }"
              v-model="$v.ingredient.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="ingredient-quantity">Quantity</label>
            <input
              type="number"
              class="form-control"
              name="quantity"
              id="ingredient-quantity"
              data-cy="quantity"
              :class="{ valid: !$v.ingredient.quantity.$invalid, invalid: $v.ingredient.quantity.$invalid }"
              v-model.number="$v.ingredient.quantity.$model"
            />
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
            :disabled="$v.ingredient.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./ingredient-update.component.ts"></script>
