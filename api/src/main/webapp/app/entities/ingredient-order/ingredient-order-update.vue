<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.ingredientOrder.home.createOrEditLabel" data-cy="IngredientOrderCreateUpdateHeading">
          Create or edit a IngredientOrder
        </h2>
        <div>
          <div class="form-group" v-if="ingredientOrder.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="ingredientOrder.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="ingredient-order-date">Date</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="ingredient-order-date"
                  v-model="$v.ingredientOrder.date.$model"
                  name="date"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="ingredient-order-date"
                data-cy="date"
                type="text"
                class="form-control"
                name="date"
                :class="{ valid: !$v.ingredientOrder.date.$invalid, invalid: $v.ingredientOrder.date.$invalid }"
                v-model="$v.ingredientOrder.date.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="ingredient-order-status">Status</label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.ingredientOrder.status.$invalid, invalid: $v.ingredientOrder.status.$invalid }"
              v-model="$v.ingredientOrder.status.$model"
              id="ingredient-order-status"
              data-cy="status"
            >
              <option
                v-for="ingredientOrderStatus in ingredientOrderStatusValues"
                :key="ingredientOrderStatus"
                v-bind:value="ingredientOrderStatus"
              >
                {{ ingredientOrderStatus }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="ingredient-order-supplifier">Supplifier</label>
            <select
              class="form-control"
              id="ingredient-order-supplifier"
              data-cy="supplifier"
              name="supplifier"
              v-model="ingredientOrder.supplifier"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  ingredientOrder.supplifier && supplierOption.id === ingredientOrder.supplifier.id
                    ? ingredientOrder.supplifier
                    : supplierOption
                "
                v-for="supplierOption in suppliers"
                :key="supplierOption.id"
              >
                {{ supplierOption.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="ingredient-order-product">Product</label>
            <select class="form-control" id="ingredient-order-product" data-cy="product" name="product" v-model="ingredientOrder.product">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  ingredientOrder.product && productOption.id === ingredientOrder.product.id ? ingredientOrder.product : productOption
                "
                v-for="productOption in products"
                :key="productOption.id"
              >
                {{ productOption.name }}
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
            :disabled="$v.ingredientOrder.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./ingredient-order-update.component.ts"></script>
