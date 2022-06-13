<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.menu.home.createOrEditLabel" data-cy="MenuCreateUpdateHeading">Create or edit a Menu</h2>
        <div>
          <div class="form-group" v-if="menu.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="menu.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="menu-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="menu-name"
              data-cy="name"
              :class="{ valid: !$v.menu.name.$invalid, invalid: $v.menu.name.$invalid }"
              v-model="$v.menu.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="menu-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="menu-description"
              data-cy="description"
              :class="{ valid: !$v.menu.description.$invalid, invalid: $v.menu.description.$invalid }"
              v-model="$v.menu.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="menu-price">Price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="menu-price"
              data-cy="price"
              :class="{ valid: !$v.menu.price.$invalid, invalid: $v.menu.price.$invalid }"
              v-model.number="$v.menu.price.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="menu-image">Image</label>
            <input
              type="text"
              class="form-control"
              name="image"
              id="menu-image"
              data-cy="image"
              :class="{ valid: !$v.menu.image.$invalid, invalid: $v.menu.image.$invalid }"
              v-model="$v.menu.image.$model"
            />
          </div>
          <div class="form-group">
            <label for="menu-restaurant">Restaurant</label>
            <select
              class="form-control"
              id="menu-restaurants"
              data-cy="restaurant"
              multiple
              name="restaurant"
              v-if="menu.restaurants !== undefined"
              v-model="menu.restaurants"
            >
              <option
                v-bind:value="getSelected(menu.restaurants, restaurantOption)"
                v-for="restaurantOption in restaurants"
                :key="restaurantOption.id"
              >
                {{ restaurantOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="menu-categorie">Categorie</label>
            <select class="form-control" id="menu-categorie" data-cy="categorie" name="categorie" v-model="menu.categorie">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="menu.categorie && categorieOption.id === menu.categorie.id ? menu.categorie : categorieOption"
                v-for="categorieOption in categories"
                :key="categorieOption.id"
              >
                {{ categorieOption.id }}
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
            :disabled="$v.menu.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./menu-update.component.ts"></script>
