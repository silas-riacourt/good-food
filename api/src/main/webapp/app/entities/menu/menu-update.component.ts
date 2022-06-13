import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import ItemService from '@/entities/item/item.service';
import { IItem } from '@/shared/model/item.model';

import RestaurantService from '@/entities/restaurant/restaurant.service';
import { IRestaurant } from '@/shared/model/restaurant.model';

import CategorieService from '@/entities/categorie/categorie.service';
import { ICategorie } from '@/shared/model/categorie.model';

import { IMenu, Menu } from '@/shared/model/menu.model';
import MenuService from './menu.service';

const validations: any = {
  menu: {
    name: {},
    description: {},
    price: {},
    image: {},
  },
};

@Component({
  validations,
})
export default class MenuUpdate extends Vue {
  @Inject('menuService') private menuService: () => MenuService;
  @Inject('alertService') private alertService: () => AlertService;

  public menu: IMenu = new Menu();

  @Inject('itemService') private itemService: () => ItemService;

  public items: IItem[] = [];

  @Inject('restaurantService') private restaurantService: () => RestaurantService;

  public restaurants: IRestaurant[] = [];

  @Inject('categorieService') private categorieService: () => CategorieService;

  public categories: ICategorie[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.menuId) {
        vm.retrieveMenu(to.params.menuId);
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
    this.menu.restaurants = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.menu.id) {
      this.menuService()
        .update(this.menu)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Menu is updated with identifier ' + param.id;
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
      this.menuService()
        .create(this.menu)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Menu is created with identifier ' + param.id;
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

  public retrieveMenu(menuId): void {
    this.menuService()
      .find(menuId)
      .then(res => {
        this.menu = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.itemService()
      .retrieve()
      .then(res => {
        this.items = res.data;
      });
    this.restaurantService()
      .retrieve()
      .then(res => {
        this.restaurants = res.data;
      });
    this.categorieService()
      .retrieve()
      .then(res => {
        this.categories = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      return selectedVals.find(value => option.id === value.id) ?? option;
    }
    return option;
  }
}
