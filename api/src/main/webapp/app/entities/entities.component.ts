import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import RestaurantService from './restaurant/restaurant.service';
import CategorieService from './categorie/categorie.service';
import ProductService from './product/product.service';
import IngredientService from './ingredient/ingredient.service';
import ClientService from './client/client.service';
import ManagerService from './manager/manager.service';
import StockService from './stock/stock.service';
import OrderService from './order/order.service';
import IngredientOrderService from './ingredient-order/ingredient-order.service';
import ProductOrderService from './product-order/product-order.service';
import SupplierService from './supplier/supplier.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('restaurantService') private restaurantService = () => new RestaurantService();
  @Provide('categorieService') private categorieService = () => new CategorieService();
  @Provide('productService') private productService = () => new ProductService();
  @Provide('ingredientService') private ingredientService = () => new IngredientService();
  @Provide('clientService') private clientService = () => new ClientService();
  @Provide('managerService') private managerService = () => new ManagerService();
  @Provide('stockService') private stockService = () => new StockService();
  @Provide('orderService') private orderService = () => new OrderService();
  @Provide('ingredientOrderService') private ingredientOrderService = () => new IngredientOrderService();
  @Provide('productOrderService') private productOrderService = () => new ProductOrderService();
  @Provide('supplierService') private supplierService = () => new SupplierService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
