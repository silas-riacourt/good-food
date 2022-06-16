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
const Product = () => import('@/entities/product/product.vue');
// prettier-ignore
const ProductUpdate = () => import('@/entities/product/product-update.vue');
// prettier-ignore
const ProductDetails = () => import('@/entities/product/product-details.vue');
// prettier-ignore
const Ingredient = () => import('@/entities/ingredient/ingredient.vue');
// prettier-ignore
const IngredientUpdate = () => import('@/entities/ingredient/ingredient-update.vue');
// prettier-ignore
const IngredientDetails = () => import('@/entities/ingredient/ingredient-details.vue');
// prettier-ignore
const Client = () => import('@/entities/client/client.vue');
// prettier-ignore
const ClientUpdate = () => import('@/entities/client/client-update.vue');
// prettier-ignore
const ClientDetails = () => import('@/entities/client/client-details.vue');
// prettier-ignore
const Manager = () => import('@/entities/manager/manager.vue');
// prettier-ignore
const ManagerUpdate = () => import('@/entities/manager/manager-update.vue');
// prettier-ignore
const ManagerDetails = () => import('@/entities/manager/manager-details.vue');
// prettier-ignore
const Stock = () => import('@/entities/stock/stock.vue');
// prettier-ignore
const StockUpdate = () => import('@/entities/stock/stock-update.vue');
// prettier-ignore
const StockDetails = () => import('@/entities/stock/stock-details.vue');
// prettier-ignore
const Order = () => import('@/entities/order/order.vue');
// prettier-ignore
const OrderUpdate = () => import('@/entities/order/order-update.vue');
// prettier-ignore
const OrderDetails = () => import('@/entities/order/order-details.vue');
// prettier-ignore
const IngredientOrder = () => import('@/entities/ingredient-order/ingredient-order.vue');
// prettier-ignore
const IngredientOrderUpdate = () => import('@/entities/ingredient-order/ingredient-order-update.vue');
// prettier-ignore
const IngredientOrderDetails = () => import('@/entities/ingredient-order/ingredient-order-details.vue');
// prettier-ignore
const ProductOrder = () => import('@/entities/product-order/product-order.vue');
// prettier-ignore
const ProductOrderUpdate = () => import('@/entities/product-order/product-order-update.vue');
// prettier-ignore
const ProductOrderDetails = () => import('@/entities/product-order/product-order-details.vue');
// prettier-ignore
const Supplier = () => import('@/entities/supplier/supplier.vue');
// prettier-ignore
const SupplierUpdate = () => import('@/entities/supplier/supplier-update.vue');
// prettier-ignore
const SupplierDetails = () => import('@/entities/supplier/supplier-details.vue');
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
      path: 'product',
      name: 'Product',
      component: Product,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/new',
      name: 'ProductCreate',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/:productId/edit',
      name: 'ProductEdit',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/:productId/view',
      name: 'ProductView',
      component: ProductDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ingredient',
      name: 'Ingredient',
      component: Ingredient,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ingredient/new',
      name: 'IngredientCreate',
      component: IngredientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ingredient/:ingredientId/edit',
      name: 'IngredientEdit',
      component: IngredientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ingredient/:ingredientId/view',
      name: 'IngredientView',
      component: IngredientDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client',
      name: 'Client',
      component: Client,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/new',
      name: 'ClientCreate',
      component: ClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/:clientId/edit',
      name: 'ClientEdit',
      component: ClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/:clientId/view',
      name: 'ClientView',
      component: ClientDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'manager',
      name: 'Manager',
      component: Manager,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'manager/new',
      name: 'ManagerCreate',
      component: ManagerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'manager/:managerId/edit',
      name: 'ManagerEdit',
      component: ManagerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'manager/:managerId/view',
      name: 'ManagerView',
      component: ManagerDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'stock',
      name: 'Stock',
      component: Stock,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'stock/new',
      name: 'StockCreate',
      component: StockUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'stock/:stockId/edit',
      name: 'StockEdit',
      component: StockUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'stock/:stockId/view',
      name: 'StockView',
      component: StockDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order',
      name: 'Order',
      component: Order,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order/new',
      name: 'OrderCreate',
      component: OrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order/:orderId/edit',
      name: 'OrderEdit',
      component: OrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order/:orderId/view',
      name: 'OrderView',
      component: OrderDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ingredient-order',
      name: 'IngredientOrder',
      component: IngredientOrder,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ingredient-order/new',
      name: 'IngredientOrderCreate',
      component: IngredientOrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ingredient-order/:ingredientOrderId/edit',
      name: 'IngredientOrderEdit',
      component: IngredientOrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ingredient-order/:ingredientOrderId/view',
      name: 'IngredientOrderView',
      component: IngredientOrderDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-order',
      name: 'ProductOrder',
      component: ProductOrder,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-order/new',
      name: 'ProductOrderCreate',
      component: ProductOrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-order/:productOrderId/edit',
      name: 'ProductOrderEdit',
      component: ProductOrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-order/:productOrderId/view',
      name: 'ProductOrderView',
      component: ProductOrderDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'supplier',
      name: 'Supplier',
      component: Supplier,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'supplier/new',
      name: 'SupplierCreate',
      component: SupplierUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'supplier/:supplierId/edit',
      name: 'SupplierEdit',
      component: SupplierUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'supplier/:supplierId/view',
      name: 'SupplierView',
      component: SupplierDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
