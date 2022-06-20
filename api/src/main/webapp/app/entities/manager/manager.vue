<template>
  <div>
    <h2 id="page-heading" data-cy="ManagerHeading">
      <span id="manager-heading">Managers</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ManagerCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-manager"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Manager </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && managers && managers.length === 0">
      <span>No managers found</span>
    </div>
    <div class="table-responsive" v-if="managers && managers.length > 0">
      <table class="table table-striped" aria-describedby="managers">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Fullname</span></th>
            <th scope="row"><span>First Name</span></th>
            <th scope="row"><span>Last Name</span></th>
            <th scope="row"><span>Phone</span></th>
            <th scope="row"><span>Mail</span></th>
            <th scope="row"><span>Internal User</span></th>
            <th scope="row"><span>Restaurant</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="manager in managers" :key="manager.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ManagerView', params: { managerId: manager.id } }">{{ manager.id }}</router-link>
            </td>
            <td>{{ manager.fullname }}</td>
            <td>{{ manager.firstName }}</td>
            <td>{{ manager.lastName }}</td>
            <td>{{ manager.phone }}</td>
            <td>{{ manager.mail }}</td>
            <td>
              {{ manager.internalUser ? manager.internalUser.login : '' }}
            </td>
            <td>
              <div v-if="manager.restaurant">
                <router-link :to="{ name: 'RestaurantView', params: { restaurantId: manager.restaurant.id } }">{{
                  manager.restaurant.name
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ManagerView', params: { managerId: manager.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ManagerEdit', params: { managerId: manager.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(manager)"
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
        ><span id="goodfoodApp.manager.delete.question" data-cy="managerDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-manager-heading">Are you sure you want to delete this Manager?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-manager"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeManager()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./manager.component.ts"></script>
