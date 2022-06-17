import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import SupplierService from '@/entities/supplier/supplier.service';
import { ISupplier } from '@/shared/model/supplier.model';

import IngredientService from '@/entities/ingredient/ingredient.service';
import { IIngredient } from '@/shared/model/ingredient.model';

import { IIngredientOrder, IngredientOrder } from '@/shared/model/ingredient-order.model';
import IngredientOrderService from './ingredient-order.service';
import { IngredientOrderStatus } from '@/shared/model/enumerations/ingredient-order-status.model';

const validations: any = {
  ingredientOrder: {
    date: {},
    status: {},
    quantity: {},
  },
};

@Component({
  validations,
})
export default class IngredientOrderUpdate extends Vue {
  @Inject('ingredientOrderService') private ingredientOrderService: () => IngredientOrderService;
  @Inject('alertService') private alertService: () => AlertService;

  public ingredientOrder: IIngredientOrder = new IngredientOrder();

  @Inject('supplierService') private supplierService: () => SupplierService;

  public suppliers: ISupplier[] = [];

  @Inject('ingredientService') private ingredientService: () => IngredientService;

  public ingredients: IIngredient[] = [];
  public ingredientOrderStatusValues: string[] = Object.keys(IngredientOrderStatus);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ingredientOrderId) {
        vm.retrieveIngredientOrder(to.params.ingredientOrderId);
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
    if (this.ingredientOrder.id) {
      this.ingredientOrderService()
        .update(this.ingredientOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A IngredientOrder is updated with identifier ' + param.id;
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
      this.ingredientOrderService()
        .create(this.ingredientOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A IngredientOrder is created with identifier ' + param.id;
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

  public retrieveIngredientOrder(ingredientOrderId): void {
    this.ingredientOrderService()
      .find(ingredientOrderId)
      .then(res => {
        this.ingredientOrder = res;
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
    this.ingredientService()
      .retrieve()
      .then(res => {
        this.ingredients = res.data;
      });
  }
}
