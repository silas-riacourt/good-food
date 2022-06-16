import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IIngredientOrder } from '@/shared/model/ingredient-order.model';

import IngredientOrderService from './ingredient-order.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class IngredientOrder extends Vue {
  @Inject('ingredientOrderService') private ingredientOrderService: () => IngredientOrderService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public ingredientOrders: IIngredientOrder[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllIngredientOrders();
  }

  public clear(): void {
    this.retrieveAllIngredientOrders();
  }

  public retrieveAllIngredientOrders(): void {
    this.isFetching = true;
    this.ingredientOrderService()
      .retrieve()
      .then(
        res => {
          this.ingredientOrders = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IIngredientOrder): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeIngredientOrder(): void {
    this.ingredientOrderService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A IngredientOrder is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllIngredientOrders();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
