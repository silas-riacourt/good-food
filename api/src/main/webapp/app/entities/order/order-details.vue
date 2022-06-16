<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="order">
        <h2 class="jh-entity-heading" data-cy="orderDetailsHeading"><span>Order</span> {{ order.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ order.name }}</span>
          </dd>
          <dt>
            <span>Total Price</span>
          </dt>
          <dd>
            <span>{{ order.totalPrice }}</span>
          </dd>
          <dt>
            <span>Date</span>
          </dt>
          <dd>
            <span>{{ order.date }}</span>
          </dd>
          <dt>
            <span>Status</span>
          </dt>
          <dd>
            <span>{{ order.status }}</span>
          </dd>
          <dt>
            <span>Payment Method</span>
          </dt>
          <dd>
            <span>{{ order.paymentMethod }}</span>
          </dd>
          <dt>
            <span>Restaurant</span>
          </dt>
          <dd>
            <div v-if="order.restaurant">
              <router-link :to="{ name: 'RestaurantView', params: { restaurantId: order.restaurant.id } }">{{
                order.restaurant.name
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Client</span>
          </dt>
          <dd>
            <div v-if="order.client">
              <router-link :to="{ name: 'ClientView', params: { clientId: order.client.id } }">{{ order.client.fullname }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="order.id" :to="{ name: 'OrderEdit', params: { orderId: order.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./order-details.component.ts"></script>
