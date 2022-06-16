<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.productOrder.home.createOrEditLabel" data-cy="ProductOrderCreateUpdateHeading">
          Create or edit a ProductOrder
        </h2>
        <div>
          <div class="form-group" v-if="productOrder.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productOrder.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-order-quantity">Quantity</label>
            <input
              type="number"
              class="form-control"
              name="quantity"
              id="product-order-quantity"
              data-cy="quantity"
              :class="{ valid: !$v.productOrder.quantity.$invalid, invalid: $v.productOrder.quantity.$invalid }"
              v-model.number="$v.productOrder.quantity.$model"
              required
            />
            <div v-if="$v.productOrder.quantity.$anyDirty && $v.productOrder.quantity.$invalid">
              <small class="form-text text-danger" v-if="!$v.productOrder.quantity.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.productOrder.quantity.min"> This field should be at least 0. </small>
              <small class="form-text text-danger" v-if="!$v.productOrder.quantity.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-order-totalPrice">Total Price</label>
            <input
              type="number"
              class="form-control"
              name="totalPrice"
              id="product-order-totalPrice"
              data-cy="totalPrice"
              :class="{ valid: !$v.productOrder.totalPrice.$invalid, invalid: $v.productOrder.totalPrice.$invalid }"
              v-model.number="$v.productOrder.totalPrice.$model"
              required
            />
            <div v-if="$v.productOrder.totalPrice.$anyDirty && $v.productOrder.totalPrice.$invalid">
              <small class="form-text text-danger" v-if="!$v.productOrder.totalPrice.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.productOrder.totalPrice.min"> This field should be at least 0. </small>
              <small class="form-text text-danger" v-if="!$v.productOrder.totalPrice.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-order-product">Product</label>
            <select
              class="form-control"
              id="product-order-product"
              data-cy="product"
              name="product"
              v-model="productOrder.product"
              required
            >
              <option v-if="!productOrder.product" v-bind:value="null" selected></option>
              <option
                v-bind:value="productOrder.product && productOption.id === productOrder.product.id ? productOrder.product : productOption"
                v-for="productOption in products"
                :key="productOption.id"
              >
                {{ productOption.name }}
              </option>
            </select>
          </div>
          <div v-if="$v.productOrder.product.$anyDirty && $v.productOrder.product.$invalid">
            <small class="form-text text-danger" v-if="!$v.productOrder.product.required"> This field is required. </small>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-order-order">Order</label>
            <select class="form-control" id="product-order-order" data-cy="order" name="order" v-model="productOrder.order">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="productOrder.order && orderOption.id === productOrder.order.id ? productOrder.order : orderOption"
                v-for="orderOption in orders"
                :key="orderOption.id"
              >
                {{ orderOption.id }}
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
            :disabled="$v.productOrder.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-order-update.component.ts"></script>
