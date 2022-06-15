import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import RestaurantService from '@/entities/restaurant/restaurant.service';
import { IRestaurant } from '@/shared/model/restaurant.model';

import IngredientService from '@/entities/ingredient/ingredient.service';
import { IIngredient } from '@/shared/model/ingredient.model';

import { IStock, Stock } from '@/shared/model/stock.model';
import StockService from './stock.service';

const validations: any = {
  stock: {
    quantity: {},
  },
};

@Component({
  validations,
})
export default class StockUpdate extends Vue {
  @Inject('stockService') private stockService: () => StockService;
  @Inject('alertService') private alertService: () => AlertService;

  public stock: IStock = new Stock();

  @Inject('restaurantService') private restaurantService: () => RestaurantService;

  public restaurants: IRestaurant[] = [];

  @Inject('ingredientService') private ingredientService: () => IngredientService;

  public ingredients: IIngredient[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.stockId) {
        vm.retrieveStock(to.params.stockId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.stock.id) {
      this.stockService()
        .update(this.stock)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Stock is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.stockService()
        .create(this.stock)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Stock is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveStock(stockId): void {
    this.stockService()
      .find(stockId)
      .then(res => {
        this.stock = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.restaurantService()
      .retrieve()
      .then(res => {
        this.restaurants = res.data;
      });
    this.ingredientService()
      .retrieve()
      .then(res => {
        this.ingredients = res.data;
      });
  }
}
