<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.supplier.home.createOrEditLabel" data-cy="SupplierCreateUpdateHeading">Create or edit a Supplier</h2>
        <div>
          <div class="form-group" v-if="supplier.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="supplier.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="supplier-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="supplier-name"
              data-cy="name"
              :class="{ valid: !$v.supplier.name.$invalid, invalid: $v.supplier.name.$invalid }"
              v-model="$v.supplier.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="supplier-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="supplier-description"
              data-cy="description"
              :class="{ valid: !$v.supplier.description.$invalid, invalid: $v.supplier.description.$invalid }"
              v-model="$v.supplier.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="supplier-number">Number</label>
            <input
              type="text"
              class="form-control"
              name="number"
              id="supplier-number"
              data-cy="number"
              :class="{ valid: !$v.supplier.number.$invalid, invalid: $v.supplier.number.$invalid }"
              v-model="$v.supplier.number.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="supplier-address">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="supplier-address"
              data-cy="address"
              :class="{ valid: !$v.supplier.address.$invalid, invalid: $v.supplier.address.$invalid }"
              v-model="$v.supplier.address.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="supplier-ingredient">Ingredient</label>
            <select class="form-control" id="supplier-ingredient" data-cy="ingredient" name="ingredient" v-model="supplier.ingredient">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  supplier.ingredient && ingredientOption.id === supplier.ingredient.id ? supplier.ingredient : ingredientOption
                "
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
            :disabled="$v.supplier.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./supplier-update.component.ts"></script>
