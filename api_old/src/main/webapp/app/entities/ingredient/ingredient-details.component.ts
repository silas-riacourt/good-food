import { Component, Vue, Inject } from 'vue-property-decorator';

import { IIngredient } from '@/shared/model/ingredient.model';
import IngredientService from './ingredient.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class IngredientDetails extends Vue {
  @Inject('ingredientService') private ingredientService: () => IngredientService;
  @Inject('alertService') private alertService: () => AlertService;

  public ingredient: IIngredient = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ingredientId) {
        vm.retrieveIngredient(to.params.ingredientId);
      }
    });
  }

  public retrieveIngredient(ingredientId) {
    this.ingredientService()
      .find(ingredientId)
      .then(res => {
        this.ingredient = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
