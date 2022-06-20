<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.manager.home.createOrEditLabel" data-cy="ManagerCreateUpdateHeading">Create or edit a Manager</h2>
        <div>
          <div class="form-group" v-if="manager.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="manager.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="manager-fullname">Fullname</label>
            <input
              type="text"
              class="form-control"
              name="fullname"
              id="manager-fullname"
              data-cy="fullname"
              :class="{ valid: !$v.manager.fullname.$invalid, invalid: $v.manager.fullname.$invalid }"
              v-model="$v.manager.fullname.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="manager-firstName">First Name</label>
            <input
              type="text"
              class="form-control"
              name="firstName"
              id="manager-firstName"
              data-cy="firstName"
              :class="{ valid: !$v.manager.firstName.$invalid, invalid: $v.manager.firstName.$invalid }"
              v-model="$v.manager.firstName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="manager-lastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              id="manager-lastName"
              data-cy="lastName"
              :class="{ valid: !$v.manager.lastName.$invalid, invalid: $v.manager.lastName.$invalid }"
              v-model="$v.manager.lastName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="manager-phone">Phone</label>
            <input
              type="text"
              class="form-control"
              name="phone"
              id="manager-phone"
              data-cy="phone"
              :class="{ valid: !$v.manager.phone.$invalid, invalid: $v.manager.phone.$invalid }"
              v-model="$v.manager.phone.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="manager-mail">Mail</label>
            <input
              type="text"
              class="form-control"
              name="mail"
              id="manager-mail"
              data-cy="mail"
              :class="{ valid: !$v.manager.mail.$invalid, invalid: $v.manager.mail.$invalid }"
              v-model="$v.manager.mail.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="manager-internalUser">Internal User</label>
            <select
              class="form-control"
              id="manager-internalUser"
              data-cy="internalUser"
              name="internalUser"
              v-model="manager.internalUser"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="manager.internalUser && userOption.id === manager.internalUser.id ? manager.internalUser : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.login }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="manager-restaurant">Restaurant</label>
            <select class="form-control" id="manager-restaurant" data-cy="restaurant" name="restaurant" v-model="manager.restaurant">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="manager.restaurant && restaurantOption.id === manager.restaurant.id ? manager.restaurant : restaurantOption"
                v-for="restaurantOption in restaurants"
                :key="restaurantOption.id"
              >
                {{ restaurantOption.name }}
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
            :disabled="$v.manager.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./manager-update.component.ts"></script>
