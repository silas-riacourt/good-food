<template>
  <div>
    <h2 id="page-heading" data-cy="CategorieHeading">
      <span id="categorie-heading">Categories</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'CategorieCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-categorie"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Categorie </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && categories && categories.length === 0">
      <span>No categories found</span>
    </div>
    <div class="table-responsive" v-if="categories && categories.length > 0">
      <table class="table table-striped" aria-describedby="categories">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Name</span></th>
            <th scope="row"><span>Description</span></th>
            <th scope="row"><span>Image</span></th>
            <th scope="row"><span>Product</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categorie in categories" :key="categorie.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CategorieView', params: { categorieId: categorie.id } }">{{ categorie.id }}</router-link>
            </td>
            <td>{{ categorie.name }}</td>
            <td>{{ categorie.description }}</td>
            <td>{{ categorie.image }}</td>
            <td>
              <span v-for="(product, i) in categorie.products" :key="product.id"
                >{{ i > 0 ? ', ' : '' }}
                <router-link class="form-control-static" :to="{ name: 'ProductView', params: { productId: product.id } }">{{
                  product.name
                }}</router-link>
              </span>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CategorieView', params: { categorieId: categorie.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CategorieEdit', params: { categorieId: categorie.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(categorie)"
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
        ><span id="goodfoodApp.categorie.delete.question" data-cy="categorieDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-categorie-heading">Are you sure you want to delete this Categorie?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-categorie"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeCategorie()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./categorie.component.ts"></script>
