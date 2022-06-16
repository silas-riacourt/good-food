import { Component, Vue, Inject } from 'vue-property-decorator';

import { IIngredientOrder } from '@/shared/model/ingredient-order.model';
import IngredientOrderService from './ingredient-order.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class IngredientOrderDetails extends Vue {
  @Inject('ingredientOrderService') private ingredientOrderService: () => IngredientOrderService;
  @Inject('alertService') private alertService: () => AlertService;

  public ingredientOrder: IIngredientOrder = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ingredientOrderId) {
        vm.retrieveIngredientOrder(to.params.ingredientOrderId);
      }
    });
  }

  public retrieveIngredientOrder(ingredientOrderId) {
    this.ingredientOrderService()
      .find(ingredientOrderId)
      .then(res => {
        this.ingredientOrder = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
