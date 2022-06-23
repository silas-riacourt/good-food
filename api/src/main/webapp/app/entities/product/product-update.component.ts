import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import IngredientService from '@/entities/ingredient/ingredient.service';
import { IIngredient } from '@/shared/model/ingredient.model';

import CategorieService from '@/entities/categorie/categorie.service';
import { ICategorie } from '@/shared/model/categorie.model';

import { IProduct, Product } from '@/shared/model/product.model';
import ProductService from './product.service';

const validations: any = {
  product: {
    name: {},
    description: {},
    price: {},
    image: {},
    tva: {},
    tvaTakeAway: {},
  },
};

@Component({
  validations,
})
export default class ProductUpdate extends Vue {
  @Inject('productService') private productService: () => ProductService;
  @Inject('alertService') private alertService: () => AlertService;

  public product: IProduct = new Product();

  @Inject('ingredientService') private ingredientService: () => IngredientService;

  public ingredients: IIngredient[] = [];

  @Inject('categorieService') private categorieService: () => CategorieService;

  public categories: ICategorie[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productId) {
        vm.retrieveProduct(to.params.productId);
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
    this.product.ingredients = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.product.id) {
      this.productService()
        .update(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Product is updated with identifier ' + param.id;
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
      this.productService()
        .create(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Product is created with identifier ' + param.id;
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

  public retrieveProduct(productId): void {
    this.productService()
      .find(productId)
      .then(res => {
        this.product = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.ingredientService()
      .retrieve()
      .then(res => {
        this.ingredients = res.data;
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
