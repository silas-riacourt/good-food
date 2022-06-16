<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.order.home.createOrEditLabel" data-cy="OrderCreateUpdateHeading">Create or edit a Order</h2>
        <div>
          <div class="form-group" v-if="order.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="order.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="order-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="order-name"
              data-cy="name"
              :class="{ valid: !$v.order.name.$invalid, invalid: $v.order.name.$invalid }"
              v-model="$v.order.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="order-totalPrice">Total Price</label>
            <input
              type="number"
              class="form-control"
              name="totalPrice"
              id="order-totalPrice"
              data-cy="totalPrice"
              :class="{ valid: !$v.order.totalPrice.$invalid, invalid: $v.order.totalPrice.$invalid }"
              v-model.number="$v.order.totalPrice.$model"
              required
            />
            <div v-if="$v.order.totalPrice.$anyDirty && $v.order.totalPrice.$invalid">
              <small class="form-text text-danger" v-if="!$v.order.totalPrice.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.order.totalPrice.min"> This field should be at least 0. </small>
              <small class="form-text text-danger" v-if="!$v.order.totalPrice.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="order-date">Date</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="order-date"
                  v-model="$v.order.date.$model"
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
                id="order-date"
                data-cy="date"
                type="text"
                class="form-control"
                name="date"
                :class="{ valid: !$v.order.date.$invalid, invalid: $v.order.date.$invalid }"
                v-model="$v.order.date.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="order-status">Status</label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.order.status.$invalid, invalid: $v.order.status.$invalid }"
              v-model="$v.order.status.$model"
              id="order-status"
              data-cy="status"
            >
              <option v-for="orderStatus in orderStatusValues" :key="orderStatus" v-bind:value="orderStatus">{{ orderStatus }}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="order-paymentMethod">Payment Method</label>
            <select
              class="form-control"
              name="paymentMethod"
              :class="{ valid: !$v.order.paymentMethod.$invalid, invalid: $v.order.paymentMethod.$invalid }"
              v-model="$v.order.paymentMethod.$model"
              id="order-paymentMethod"
              data-cy="paymentMethod"
            >
              <option v-for="paymentMethod in paymentMethodValues" :key="paymentMethod" v-bind:value="paymentMethod">
                {{ paymentMethod }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="order-restaurant">Restaurant</label>
            <select class="form-control" id="order-restaurant" data-cy="restaurant" name="restaurant" v-model="order.restaurant">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="order.restaurant && restaurantOption.id === order.restaurant.id ? order.restaurant : restaurantOption"
                v-for="restaurantOption in restaurants"
                :key="restaurantOption.id"
              >
                {{ restaurantOption.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="order-client">Client</label>
            <select class="form-control" id="order-client" data-cy="client" name="client" v-model="order.client">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="order.client && clientOption.id === order.client.id ? order.client : clientOption"
                v-for="clientOption in clients"
                :key="clientOption.id"
              >
                {{ clientOption.fullname }}
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
            :disabled="$v.order.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./order-update.component.ts"></script>
