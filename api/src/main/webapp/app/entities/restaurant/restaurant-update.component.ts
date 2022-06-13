import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import MenuService from '@/entities/menu/menu.service';
import { IMenu } from '@/shared/model/menu.model';

import { IRestaurant, Restaurant } from '@/shared/model/restaurant.model';
import RestaurantService from './restaurant.service';

const validations: any = {
  restaurant: {
    name: {},
    locationName: {},
    open: {},
    locationLat: {},
    locationLng: {},
  },
};

@Component({
  validations,
})
export default class RestaurantUpdate extends Vue {
  @Inject('restaurantService') private restaurantService: () => RestaurantService;
  @Inject('alertService') private alertService: () => AlertService;

  public restaurant: IRestaurant = new Restaurant();

  @Inject('menuService') private menuService: () => MenuService;

  public menus: IMenu[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.restaurantId) {
        vm.retrieveRestaurant(to.params.restaurantId);
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
    if (this.restaurant.id) {
      this.restaurantService()
        .update(this.restaurant)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Restaurant is updated with identifier ' + param.id;
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
      this.restaurantService()
        .create(this.restaurant)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Restaurant is created with identifier ' + param.id;
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

  public retrieveRestaurant(restaurantId): void {
    this.restaurantService()
      .find(restaurantId)
      .then(res => {
        this.restaurant = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.menuService()
      .retrieve()
      .then(res => {
        this.menus = res.data;
      });
  }
}
