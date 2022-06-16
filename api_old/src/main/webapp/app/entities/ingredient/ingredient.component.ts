import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IIngredient } from '@/shared/model/ingredient.model';

import IngredientService from './ingredient.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Ingredient extends Vue {
  @Inject('ingredientService') private ingredientService: () => IngredientService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public ingredients: IIngredient[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllIngredients();
  }

  public clear(): void {
    this.retrieveAllIngredients();
  }

  public retrieveAllIngredients(): void {
    this.isFetching = true;
    this.ingredientService()
      .retrieve()
      .then(
        res => {
          this.ingredients = res.data;
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

  public prepareRemove(instance: IIngredient): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeIngredient(): void {
    this.ingredientService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Ingredient is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllIngredients();
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
