<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.restaurant.home.createOrEditLabel" data-cy="RestaurantCreateUpdateHeading">Create or edit a Restaurant</h2>
        <div>
          <div class="form-group" v-if="restaurant.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="restaurant.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="restaurant-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="restaurant-name"
              data-cy="name"
              :class="{ valid: !$v.restaurant.name.$invalid, invalid: $v.restaurant.name.$invalid }"
              v-model="$v.restaurant.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="restaurant-locationName">Location Name</label>
            <input
              type="text"
              class="form-control"
              name="locationName"
              id="restaurant-locationName"
              data-cy="locationName"
              :class="{ valid: !$v.restaurant.locationName.$invalid, invalid: $v.restaurant.locationName.$invalid }"
              v-model="$v.restaurant.locationName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="restaurant-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="restaurant-description"
              data-cy="description"
              :class="{ valid: !$v.restaurant.description.$invalid, invalid: $v.restaurant.description.$invalid }"
              v-model="$v.restaurant.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="restaurant-schedule">Schedule</label>
            <input
              type="text"
              class="form-control"
              name="schedule"
              id="restaurant-schedule"
              data-cy="schedule"
              :class="{ valid: !$v.restaurant.schedule.$invalid, invalid: $v.restaurant.schedule.$invalid }"
              v-model="$v.restaurant.schedule.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="restaurant-open">Open</label>
            <input
              type="checkbox"
              class="form-check"
              name="open"
              id="restaurant-open"
              data-cy="open"
              :class="{ valid: !$v.restaurant.open.$invalid, invalid: $v.restaurant.open.$invalid }"
              v-model="$v.restaurant.open.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="restaurant-locationLat">Location Lat</label>
            <input
              type="number"
              class="form-control"
              name="locationLat"
              id="restaurant-locationLat"
              data-cy="locationLat"
              :class="{ valid: !$v.restaurant.locationLat.$invalid, invalid: $v.restaurant.locationLat.$invalid }"
              v-model.number="$v.restaurant.locationLat.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="restaurant-locationLng">Location Lng</label>
            <input
              type="number"
              class="form-control"
              name="locationLng"
              id="restaurant-locationLng"
              data-cy="locationLng"
              :class="{ valid: !$v.restaurant.locationLng.$invalid, invalid: $v.restaurant.locationLng.$invalid }"
              v-model.number="$v.restaurant.locationLng.$model"
            />
          </div>
          <div class="form-group">
            <label for="restaurant-categorie">Categorie</label>
            <select
              class="form-control"
              id="restaurant-categories"
              data-cy="categorie"
              multiple
              name="categorie"
              v-if="restaurant.categories !== undefined"
              v-model="restaurant.categories"
            >
              <option
                v-bind:value="getSelected(restaurant.categories, categorieOption)"
                v-for="categorieOption in categories"
                :key="categorieOption.id"
              >
                {{ categorieOption.name }}
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
            :disabled="$v.restaurant.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./restaurant-update.component.ts"></script>
