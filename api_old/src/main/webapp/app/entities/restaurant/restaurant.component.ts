import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRestaurant } from '@/shared/model/restaurant.model';

import RestaurantService from './restaurant.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Restaurant extends Vue {
  @Inject('restaurantService') private restaurantService: () => RestaurantService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public restaurants: IRestaurant[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllRestaurants();
  }

  public clear(): void {
    this.retrieveAllRestaurants();
  }

  public retrieveAllRestaurants(): void {
    this.isFetching = true;
    this.restaurantService()
      .retrieve()
      .then(
        res => {
          this.restaurants = res.data;
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

  public prepareRemove(instance: IRestaurant): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeRestaurant(): void {
    this.restaurantService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Restaurant is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllRestaurants();
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
