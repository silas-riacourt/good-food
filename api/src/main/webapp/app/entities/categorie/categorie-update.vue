<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.categorie.home.createOrEditLabel" data-cy="CategorieCreateUpdateHeading">Create or edit a Categorie</h2>
        <div>
          <div class="form-group" v-if="categorie.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="categorie.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="categorie-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="categorie-name"
              data-cy="name"
              :class="{ valid: !$v.categorie.name.$invalid, invalid: $v.categorie.name.$invalid }"
              v-model="$v.categorie.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="categorie-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="categorie-description"
              data-cy="description"
              :class="{ valid: !$v.categorie.description.$invalid, invalid: $v.categorie.description.$invalid }"
              v-model="$v.categorie.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="categorie-image">Image</label>
            <input
              type="text"
              class="form-control"
              name="image"
              id="categorie-image"
              data-cy="image"
              :class="{ valid: !$v.categorie.image.$invalid, invalid: $v.categorie.image.$invalid }"
              v-model="$v.categorie.image.$model"
            />
          </div>
          <div class="form-group">
            <label for="categorie-product">Product</label>
            <select
              class="form-control"
              id="categorie-products"
              data-cy="product"
              multiple
              name="product"
              v-if="categorie.products !== undefined"
              v-model="categorie.products"
            >
              <option
                v-bind:value="getSelected(categorie.products, productOption)"
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
            :disabled="$v.categorie.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./categorie-update.component.ts"></script>
