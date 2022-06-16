<template>
  <div>
    <h2 id="page-heading" data-cy="IngredientHeading">
      <span id="ingredient-heading">Ingredients</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'IngredientCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-ingredient"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Ingredient </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && ingredients && ingredients.length === 0">
      <span>No ingredients found</span>
    </div>
    <div class="table-responsive" v-if="ingredients && ingredients.length > 0">
      <table class="table table-striped" aria-describedby="ingredients">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Name</span></th>
            <th scope="row"><span>Quantity</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingredient in ingredients" :key="ingredient.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'IngredientView', params: { ingredientId: ingredient.id } }">{{ ingredient.id }}</router-link>
            </td>
            <td>{{ ingredient.name }}</td>
            <td>{{ ingredient.quantity }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'IngredientView', params: { ingredientId: ingredient.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'IngredientEdit', params: { ingredientId: ingredient.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(ingredient)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="goodfoodApp.ingredient.delete.question" data-cy="ingredientDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-ingredient-heading">Are you sure you want to delete this Ingredient?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-ingredient"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeIngredient()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./ingredient.component.ts"></script>
