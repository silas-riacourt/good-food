import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import RestaurantService from '@/entities/restaurant/restaurant.service';
import { IRestaurant } from '@/shared/model/restaurant.model';

import { ICategorie, Categorie } from '@/shared/model/categorie.model';
import CategorieService from './categorie.service';

const validations: any = {
  categorie: {
    name: {},
    description: {},
    image: {},
  },
};

@Component({
  validations,
})
export default class CategorieUpdate extends Vue {
  @Inject('categorieService') private categorieService: () => CategorieService;
  @Inject('alertService') private alertService: () => AlertService;

  public categorie: ICategorie = new Categorie();

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];

  @Inject('restaurantService') private restaurantService: () => RestaurantService;

  public restaurants: IRestaurant[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.categorieId) {
        vm.retrieveCategorie(to.params.categorieId);
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
    this.categorie.products = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.categorie.id) {
      this.categorieService()
        .update(this.categorie)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Categorie is updated with identifier ' + param.id;
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
      this.categorieService()
        .create(this.categorie)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Categorie is created with identifier ' + param.id;
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

  public retrieveCategorie(categorieId): void {
    this.categorieService()
      .find(categorieId)
      .then(res => {
        this.categorie = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
    this.restaurantService()
      .retrieve()
      .then(res => {
        this.restaurants = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      return selectedVals.find(value => option.id === value.id) ?? option;
    }
    return option;
  }
}
