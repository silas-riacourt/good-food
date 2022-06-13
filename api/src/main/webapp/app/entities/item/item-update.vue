<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="goodfoodApp.item.home.createOrEditLabel" data-cy="ItemCreateUpdateHeading">Create or edit a Item</h2>
        <div>
          <div class="form-group" v-if="item.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="item.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="item-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="item-name"
              data-cy="name"
              :class="{ valid: !$v.item.name.$invalid, invalid: $v.item.name.$invalid }"
              v-model="$v.item.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="item-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="item-description"
              data-cy="description"
              :class="{ valid: !$v.item.description.$invalid, invalid: $v.item.description.$invalid }"
              v-model="$v.item.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="item-price">Price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="item-price"
              data-cy="price"
              :class="{ valid: !$v.item.price.$invalid, invalid: $v.item.price.$invalid }"
              v-model.number="$v.item.price.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="item-image">Image</label>
            <input
              type="text"
              class="form-control"
              name="image"
              id="item-image"
              data-cy="image"
              :class="{ valid: !$v.item.image.$invalid, invalid: $v.item.image.$invalid }"
              v-model="$v.item.image.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="item-menu">Menu</label>
            <select class="form-control" id="item-menu" data-cy="menu" name="menu" v-model="item.menu">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="item.menu && menuOption.id === item.menu.id ? item.menu : menuOption"
                v-for="menuOption in menus"
                :key="menuOption.id"
              >
                {{ menuOption.id }}
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
            :disabled="$v.item.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./item-update.component.ts"></script>
