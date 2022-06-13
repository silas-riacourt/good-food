<template>
  <div>
    <h2 id="page-heading" data-cy="MenuHeading">
      <span id="menu-heading">Menus</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'MenuCreate' }" custom v-slot="{ navigate }">
          <button @click="navigate" id="jh-create-entity" data-cy="entityCreateButton" class="btn btn-primary jh-create-entity create-menu">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Menu </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && menus && menus.length === 0">
      <span>No menus found</span>
    </div>
    <div class="table-responsive" v-if="menus && menus.length > 0">
      <table class="table table-striped" aria-describedby="menus">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Name</span></th>
            <th scope="row"><span>Description</span></th>
            <th scope="row"><span>Price</span></th>
            <th scope="row"><span>Image</span></th>
            <th scope="row"><span>Restaurant</span></th>
            <th scope="row"><span>Categorie</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="menu in menus" :key="menu.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'MenuView', params: { menuId: menu.id } }">{{ menu.id }}</router-link>
            </td>
            <td>{{ menu.name }}</td>
            <td>{{ menu.description }}</td>
            <td>{{ menu.price }}</td>
            <td>{{ menu.image }}</td>
            <td>
              <span v-for="(restaurant, i) in menu.restaurants" :key="restaurant.id"
                >{{ i > 0 ? ', ' : '' }}
                <router-link class="form-control-static" :to="{ name: 'RestaurantView', params: { restaurantId: restaurant.id } }">{{
                  restaurant.id
                }}</router-link>
              </span>
            </td>
            <td>
              <div v-if="menu.categorie">
                <router-link :to="{ name: 'CategorieView', params: { categorieId: menu.categorie.id } }">{{
                  menu.categorie.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'MenuView', params: { menuId: menu.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'MenuEdit', params: { menuId: menu.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(menu)"
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
        ><span id="goodfoodApp.menu.delete.question" data-cy="menuDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-menu-heading">Are you sure you want to delete this Menu?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-menu"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeMenu()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./menu.component.ts"></script>
