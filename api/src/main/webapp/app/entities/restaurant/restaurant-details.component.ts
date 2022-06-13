import { Component, Vue, Inject } from 'vue-property-decorator';

import { IRestaurant } from '@/shared/model/restaurant.model';
import RestaurantService from './restaurant.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class RestaurantDetails extends Vue {
  @Inject('restaurantService') private restaurantService: () => RestaurantService;
  @Inject('alertService') private alertService: () => AlertService;

  public restaurant: IRestaurant = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.restaurantId) {
        vm.retrieveRestaurant(to.params.restaurantId);
      }
    });
  }

  public retrieveRestaurant(restaurantId) {
    this.restaurantService()
      .find(restaurantId)
      .then(res => {
        this.restaurant = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
