<template>
  <div>
    <b-dropdown-item to="/restaurant">
      <font-awesome-icon icon="asterisk" />
      <span>Restaurant</span>
    </b-dropdown-item>
    <b-dropdown-item to="/categorie">
      <font-awesome-icon icon="asterisk" />
      <span>Categorie</span>
    </b-dropdown-item>
    <b-dropdown-item to="/item">
      <font-awesome-icon icon="asterisk" />
      <span>Item</span>
    </b-dropdown-item>
    <b-dropdown-item to="/menu">
      <font-awesome-icon icon="asterisk" />
      <span>Menu</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
