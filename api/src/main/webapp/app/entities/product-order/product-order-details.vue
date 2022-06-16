<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="productOrder">
        <h2 class="jh-entity-heading" data-cy="productOrderDetailsHeading"><span>ProductOrder</span> {{ productOrder.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Quantity</span>
          </dt>
          <dd>
            <span>{{ productOrder.quantity }}</span>
          </dd>
          <dt>
            <span>Total Price</span>
          </dt>
          <dd>
            <span>{{ productOrder.totalPrice }}</span>
          </dd>
          <dt>
            <span>Product</span>
          </dt>
          <dd>
            <div v-if="productOrder.product">
              <router-link :to="{ name: 'ProductView', params: { productId: productOrder.product.id } }">{{
                productOrder.product.name
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Order</span>
          </dt>
          <dd>
            <div v-if="productOrder.order">
              <router-link :to="{ name: 'OrderView', params: { orderId: productOrder.order.id } }">{{ productOrder.order.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="productOrder.id"
          :to="{ name: 'ProductOrderEdit', params: { productOrderId: productOrder.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./product-order-details.component.ts"></script>
