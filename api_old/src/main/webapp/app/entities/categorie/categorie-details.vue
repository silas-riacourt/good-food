<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="categorie">
        <h2 class="jh-entity-heading" data-cy="categorieDetailsHeading"><span>Categorie</span> {{ categorie.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ categorie.name }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ categorie.description }}</span>
          </dd>
          <dt>
            <span>Image</span>
          </dt>
          <dd>
            <span>{{ categorie.image }}</span>
          </dd>
          <dt>
            <span>Product</span>
          </dt>
          <dd>
            <span v-for="(product, i) in categorie.products" :key="product.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'ProductView', params: { productId: product.id } }">{{ product.name }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="categorie.id"
          :to="{ name: 'CategorieEdit', params: { categorieId: categorie.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./categorie-details.component.ts"></script>
