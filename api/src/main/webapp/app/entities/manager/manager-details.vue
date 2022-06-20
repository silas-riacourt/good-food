<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="manager">
        <h2 class="jh-entity-heading" data-cy="managerDetailsHeading"><span>Manager</span> {{ manager.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Fullname</span>
          </dt>
          <dd>
            <span>{{ manager.fullname }}</span>
          </dd>
          <dt>
            <span>First Name</span>
          </dt>
          <dd>
            <span>{{ manager.firstName }}</span>
          </dd>
          <dt>
            <span>Last Name</span>
          </dt>
          <dd>
            <span>{{ manager.lastName }}</span>
          </dd>
          <dt>
            <span>Phone</span>
          </dt>
          <dd>
            <span>{{ manager.phone }}</span>
          </dd>
          <dt>
            <span>Mail</span>
          </dt>
          <dd>
            <span>{{ manager.mail }}</span>
          </dd>
          <dt>
            <span>Internal User</span>
          </dt>
          <dd>
            {{ manager.internalUser ? manager.internalUser.login : '' }}
          </dd>
          <dt>
            <span>Restaurant</span>
          </dt>
          <dd>
            <div v-if="manager.restaurant">
              <router-link :to="{ name: 'RestaurantView', params: { restaurantId: manager.restaurant.id } }">{{
                manager.restaurant.name
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="manager.id" :to="{ name: 'ManagerEdit', params: { managerId: manager.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./manager-details.component.ts"></script>
