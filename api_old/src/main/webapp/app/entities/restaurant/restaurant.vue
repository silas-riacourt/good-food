<template>
  <div>
    <h2 id="page-heading" data-cy="RestaurantHeading">
      <span id="restaurant-heading">Restaurants</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'RestaurantCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-restaurant"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Restaurant </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && restaurants && restaurants.length === 0">
      <span>No restaurants found</span>
    </div>
    <div class="table-responsive" v-if="restaurants && restaurants.length > 0">
      <table class="table table-striped" aria-describedby="restaurants">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Name</span></th>
            <th scope="row"><span>Location Name</span></th>
            <th scope="row"><span>Description</span></th>
            <th scope="row"><span>Schedule</span></th>
            <th scope="row"><span>Open</span></th>
            <th scope="row"><span>Location Lat</span></th>
            <th scope="row"><span>Location Lng</span></th>
            <th scope="row"><span>Categorie</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="restaurant in restaurants" :key="restaurant.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'RestaurantView', params: { restaurantId: restaurant.id } }">{{ restaurant.id }}</router-link>
            </td>
            <td>{{ restaurant.name }}</td>
            <td>{{ restaurant.locationName }}</td>
            <td>{{ restaurant.description }}</td>
            <td>{{ restaurant.schedule }}</td>
            <td>{{ restaurant.open }}</td>
            <td>{{ restaurant.locationLat }}</td>
            <td>{{ restaurant.locationLng }}</td>
            <td>
              <span v-for="(categorie, i) in restaurant.categories" :key="categorie.id"
                >{{ i > 0 ? ', ' : '' }}
                <router-link class="form-control-static" :to="{ name: 'CategorieView', params: { categorieId: categorie.id } }">{{
                  categorie.name
                }}</router-link>
              </span>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'RestaurantView', params: { restaurantId: restaurant.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'RestaurantEdit', params: { restaurantId: restaurant.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(restaurant)"
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
        ><span id="goodfoodApp.restaurant.delete.question" data-cy="restaurantDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-restaurant-heading">Are you sure you want to delete this Restaurant?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-restaurant"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeRestaurant()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./restaurant.component.ts"></script>
