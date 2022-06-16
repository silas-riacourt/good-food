import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import SupplierService from '@/entities/supplier/supplier.service';
import { ISupplier } from '@/shared/model/supplier.model';

import StockService from '@/entities/stock/stock.service';
import { IStock } from '@/shared/model/stock.model';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import { IIngredient, Ingredient } from '@/shared/model/ingredient.model';
import IngredientService from './ingredient.service';

const validations: any = {
  ingredient: {
    name: {},
    quantity: {},
  },
};

@Component({
  validations,
})
export default class IngredientUpdate extends Vue {
  @Inject('ingredientService') private ingredientService: () => IngredientService;
  @Inject('alertService') private alertService: () => AlertService;

  public ingredient: IIngredient = new Ingredient();

  @Inject('supplierService') private supplierService: () => SupplierService;

  public suppliers: ISupplier[] = [];

  @Inject('stockService') private stockService: () => StockService;

  public stocks: IStock[] = [];

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ingredientId) {
        vm.retrieveIngredient(to.params.ingredientId);
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
    if (this.ingredient.id) {
      this.ingredientService()
        .update(this.ingredient)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Ingredient is updated with identifier ' + param.id;
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
      this.ingredientService()
        .create(this.ingredient)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Ingredient is created with identifier ' + param.id;
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

  public retrieveIngredient(ingredientId): void {
    this.ingredientService()
      .find(ingredientId)
      .then(res => {
        this.ingredient = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.supplierService()
      .retrieve()
      .then(res => {
        this.suppliers = res.data;
      });
    this.stockService()
      .retrieve()
      .then(res => {
        this.stocks = res.data;
      });
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
  }
}
