<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="client">
        <h2 class="jh-entity-heading" data-cy="clientDetailsHeading"><span>Client</span> {{ client.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Fullname</span>
          </dt>
          <dd>
            <span>{{ client.fullname }}</span>
          </dd>
          <dt>
            <span>First Name</span>
          </dt>
          <dd>
            <span>{{ client.firstName }}</span>
          </dd>
          <dt>
            <span>Last Name</span>
          </dt>
          <dd>
            <span>{{ client.lastName }}</span>
          </dd>
          <dt>
            <span>Phone</span>
          </dt>
          <dd>
            <span>{{ client.phone }}</span>
          </dd>
          <dt>
            <span>Mail</span>
          </dt>
          <dd>
            <span>{{ client.mail }}</span>
          </dd>
          <dt>
            <span>Internal User</span>
          </dt>
          <dd>
            {{ client.internalUser ? client.internalUser.login : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="client.id" :to="{ name: 'ClientEdit', params: { clientId: client.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./client-details.component.ts"></script>
