<template>
  <div>
    <h2 id="page-heading" data-cy="IngredientOrderHeading">
      <span id="ingredient-order-heading">Ingredient Orders</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'IngredientOrderCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-ingredient-order"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Ingredient Order </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && ingredientOrders && ingredientOrders.length === 0">
      <span>No ingredientOrders found</span>
    </div>
    <div class="table-responsive" v-if="ingredientOrders && ingredientOrders.length > 0">
      <table class="table table-striped" aria-describedby="ingredientOrders">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Date</span></th>
            <th scope="row"><span>Status</span></th>
            <th scope="row"><span>Quantity</span></th>
            <th scope="row"><span>Supplifier</span></th>
            <th scope="row"><span>Ingredient</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingredientOrder in ingredientOrders" :key="ingredientOrder.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'IngredientOrderView', params: { ingredientOrderId: ingredientOrder.id } }">{{
                ingredientOrder.id
              }}</router-link>
            </td>
            <td>{{ ingredientOrder.date }}</td>
            <td>{{ ingredientOrder.status }}</td>
            <td>{{ ingredientOrder.quantity }}</td>
            <td>
              <div v-if="ingredientOrder.supplifier">
                <router-link :to="{ name: 'SupplierView', params: { supplierId: ingredientOrder.supplifier.id } }">{{
                  ingredientOrder.supplifier.name
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="ingredientOrder.ingredient">
                <router-link :to="{ name: 'IngredientView', params: { ingredientId: ingredientOrder.ingredient.id } }">{{
                  ingredientOrder.ingredient.name
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'IngredientOrderView', params: { ingredientOrderId: ingredientOrder.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'IngredientOrderEdit', params: { ingredientOrderId: ingredientOrder.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(ingredientOrder)"
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
        ><span id="goodfoodApp.ingredientOrder.delete.question" data-cy="ingredientOrderDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-ingredientOrder-heading">Are you sure you want to delete this Ingredient Order?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-ingredientOrder"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeIngredientOrder()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./ingredient-order.component.ts"></script>
