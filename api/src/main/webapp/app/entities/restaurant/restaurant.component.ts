import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRestaurant } from '@/shared/model/restaurant.model';

import RestaurantService from './restaurant.service';
import AlertService from '@/shared/alert/alert.service';
import AccountService from '@/account/account.service';
@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Restaurant extends Vue {


  @Inject('accountService') private accountService: () => AccountService;
  private hasAnyAuthorityValues = {};

  @Inject('restaurantService') private restaurantService: () => RestaurantService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public restaurants: IRestaurant[] = [];

  public isFetching = false;

  public mounted(): void {

    if(this.$store.getters.account.authorities.includes('ROLE_MANAGER')){
      this.retrieveAllRestaurantsByManager();
    }else{
      this.retrieveAllRestaurants();
    }

  }
public hasAnyAuthority(authorities: any): boolean {
    this.accountService()
      .hasAnyAuthorityAndCheckAuth(authorities)
      .then(value => {
        this.hasAnyAuthorityValues[authorities] = value;
      });
    return this.hasAnyAuthorityValues[authorities] ?? false;
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
  public retrieveAllRestaurantsByManager(): void {

    let managerId = 0;
    this.restaurantService()
      .getMnagerId (this.$store.getters.account?.id)
      .then(
        res => {
          managerId = res.data.id;
        
          this.restaurantService()
          .retrieveByManager(managerId)
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
