import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import UserService from '@/entities/user/user.service';

import RestaurantService from '@/entities/restaurant/restaurant.service';
import { IRestaurant } from '@/shared/model/restaurant.model';

import { IManager, Manager } from '@/shared/model/manager.model';
import ManagerService from './manager.service';

const validations: any = {
  manager: {
    fullname: {},
    firstName: {},
    lastName: {},
    phone: {},
    mail: {},
  },
};

@Component({
  validations,
})
export default class ManagerUpdate extends Vue {
  @Inject('managerService') private managerService: () => ManagerService;
  @Inject('alertService') private alertService: () => AlertService;

  public manager: IManager = new Manager();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('restaurantService') private restaurantService: () => RestaurantService;

  public restaurants: IRestaurant[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.managerId) {
        vm.retrieveManager(to.params.managerId);
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
    if (this.manager.id) {
      this.managerService()
        .update(this.manager)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Manager is updated with identifier ' + param.id;
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
      this.managerService()
        .create(this.manager)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Manager is created with identifier ' + param.id;
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

  public retrieveManager(managerId): void {
    this.managerService()
      .find(managerId)
      .then(res => {
        this.manager = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.restaurantService()
      .retrieve()
      .then(res => {
        this.restaurants = res.data;
      });
  }
}
