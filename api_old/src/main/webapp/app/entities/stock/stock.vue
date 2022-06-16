<template>
  <div>
    <h2 id="page-heading" data-cy="StockHeading">
      <span id="stock-heading">Stocks</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'StockCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-stock"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Stock </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && stocks && stocks.length === 0">
      <span>No stocks found</span>
    </div>
    <div class="table-responsive" v-if="stocks && stocks.length > 0">
      <table class="table table-striped" aria-describedby="stocks">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Quantity</span></th>
            <th scope="row"><span>Restaurant</span></th>
            <th scope="row"><span>Ingredient</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stock in stocks" :key="stock.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'StockView', params: { stockId: stock.id } }">{{ stock.id }}</router-link>
            </td>
            <td>{{ stock.quantity }}</td>
            <td>
              <div v-if="stock.restaurant">
                <router-link :to="{ name: 'RestaurantView', params: { restaurantId: stock.restaurant.id } }">{{
                  stock.restaurant.name
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="stock.ingredient">
                <router-link :to="{ name: 'IngredientView', params: { ingredientId: stock.ingredient.id } }">{{
                  stock.ingredient.name
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'StockView', params: { stockId: stock.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'StockEdit', params: { stockId: stock.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(stock)"
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
        ><span id="goodfoodApp.stock.delete.question" data-cy="stockDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-stock-heading">Are you sure you want to delete this Stock?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-stock"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeStock()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./stock.component.ts"></script>
