<template>
  <div>
    <h2 id="page-heading" data-cy="ProductOrderHeading">
      <span id="product-order-heading">Product Orders</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProductOrderCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-product-order"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Product Order </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && productOrders && productOrders.length === 0">
      <span>No productOrders found</span>
    </div>
    <div class="table-responsive" v-if="productOrders && productOrders.length > 0">
      <table class="table table-striped" aria-describedby="productOrders">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Quantity</span></th>
            <th scope="row"><span>Total Price</span></th>
            <th scope="row"><span>Product</span></th>
            <th scope="row"><span>Order</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="productOrder in productOrders" :key="productOrder.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProductOrderView', params: { productOrderId: productOrder.id } }">{{
                productOrder.id
              }}</router-link>
            </td>
            <td>{{ productOrder.quantity }}</td>
            <td>{{ productOrder.totalPrice }}</td>
            <td>
              <div v-if="productOrder.product">
                <router-link :to="{ name: 'ProductView', params: { productId: productOrder.product.id } }">{{
                  productOrder.product.name
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="productOrder.order">
                <router-link :to="{ name: 'OrderView', params: { orderId: productOrder.order.id } }">{{
                  productOrder.order.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ProductOrderView', params: { productOrderId: productOrder.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ProductOrderEdit', params: { productOrderId: productOrder.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(productOrder)"
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
        ><span id="goodfoodApp.productOrder.delete.question" data-cy="productOrderDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-productOrder-heading">Are you sure you want to delete this Product Order?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-productOrder"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeProductOrder()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./product-order.component.ts"></script>
