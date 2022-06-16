<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.client.home.createOrEditLabel" data-cy="ClientCreateUpdateHeading">Create or edit a Client</h2>
        <div>
          <div class="form-group" v-if="client.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="client.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="client-fullname">Fullname</label>
            <input
              type="text"
              class="form-control"
              name="fullname"
              id="client-fullname"
              data-cy="fullname"
              :class="{ valid: !$v.client.fullname.$invalid, invalid: $v.client.fullname.$invalid }"
              v-model="$v.client.fullname.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="client-firstName">First Name</label>
            <input
              type="text"
              class="form-control"
              name="firstName"
              id="client-firstName"
              data-cy="firstName"
              :class="{ valid: !$v.client.firstName.$invalid, invalid: $v.client.firstName.$invalid }"
              v-model="$v.client.firstName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="client-lastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              id="client-lastName"
              data-cy="lastName"
              :class="{ valid: !$v.client.lastName.$invalid, invalid: $v.client.lastName.$invalid }"
              v-model="$v.client.lastName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="client-phone">Phone</label>
            <input
              type="text"
              class="form-control"
              name="phone"
              id="client-phone"
              data-cy="phone"
              :class="{ valid: !$v.client.phone.$invalid, invalid: $v.client.phone.$invalid }"
              v-model="$v.client.phone.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="client-mail">Mail</label>
            <input
              type="text"
              class="form-control"
              name="mail"
              id="client-mail"
              data-cy="mail"
              :class="{ valid: !$v.client.mail.$invalid, invalid: $v.client.mail.$invalid }"
              v-model="$v.client.mail.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="client-internalUser">Internal User</label>
            <select class="form-control" id="client-internalUser" data-cy="internalUser" name="internalUser" v-model="client.internalUser">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="client.internalUser && userOption.id === client.internalUser.id ? client.internalUser : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.login }}
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
            :disabled="$v.client.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./client-update.component.ts"></script>
