import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Restaurant = () => import('@/entities/restaurant/restaurant.vue');
// prettier-ignore
const RestaurantUpdate = () => import('@/entities/restaurant/restaurant-update.vue');
// prettier-ignore
const RestaurantDetails = () => import('@/entities/restaurant/restaurant-details.vue');
// prettier-ignore
const Categorie = () => import('@/entities/categorie/categorie.vue');
// prettier-ignore
const CategorieUpdate = () => import('@/entities/categorie/categorie-update.vue');
// prettier-ignore
const CategorieDetails = () => import('@/entities/categorie/categorie-details.vue');
// prettier-ignore
const Item = () => import('@/entities/item/item.vue');
// prettier-ignore
const ItemUpdate = () => import('@/entities/item/item-update.vue');
// prettier-ignore
const ItemDetails = () => import('@/entities/item/item-details.vue');
// prettier-ignore
const Menu = () => import('@/entities/menu/menu.vue');
// prettier-ignore
const MenuUpdate = () => import('@/entities/menu/menu-update.vue');
// prettier-ignore
const MenuDetails = () => import('@/entities/menu/menu-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'restaurant',
      name: 'Restaurant',
      component: Restaurant,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurant/new',
      name: 'RestaurantCreate',
      component: RestaurantUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurant/:restaurantId/edit',
      name: 'RestaurantEdit',
      component: RestaurantUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurant/:restaurantId/view',
      name: 'RestaurantView',
      component: RestaurantDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'categorie',
      name: 'Categorie',
      component: Categorie,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'categorie/new',
      name: 'CategorieCreate',
      component: CategorieUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'categorie/:categorieId/edit',
      name: 'CategorieEdit',
      component: CategorieUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'categorie/:categorieId/view',
      name: 'CategorieView',
      component: CategorieDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'item',
      name: 'Item',
      component: Item,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'item/new',
      name: 'ItemCreate',
      component: ItemUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'item/:itemId/edit',
      name: 'ItemEdit',
      component: ItemUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'item/:itemId/view',
      name: 'ItemView',
      component: ItemDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'menu',
      name: 'Menu',
      component: Menu,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'menu/new',
      name: 'MenuCreate',
      component: MenuUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'menu/:menuId/edit',
      name: 'MenuEdit',
      component: MenuUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'menu/:menuId/view',
      name: 'MenuView',
      component: MenuDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
