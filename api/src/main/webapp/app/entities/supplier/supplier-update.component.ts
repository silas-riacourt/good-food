import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import IngredientService from '@/entities/ingredient/ingredient.service';
import { IIngredient } from '@/shared/model/ingredient.model';

import { ISupplier, Supplier } from '@/shared/model/supplier.model';
import SupplierService from './supplier.service';

const validations: any = {
  supplier: {
    name: {},
    description: {},
    number: {},
    address: {},
  },
};

@Component({
  validations,
})
export default class SupplierUpdate extends Vue {
  @Inject('supplierService') private supplierService: () => SupplierService;
  @Inject('alertService') private alertService: () => AlertService;

  public supplier: ISupplier = new Supplier();

  @Inject('ingredientService') private ingredientService: () => IngredientService;

  public ingredients: IIngredient[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.supplierId) {
        vm.retrieveSupplier(to.params.supplierId);
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
    if (this.supplier.id) {
      this.supplierService()
        .update(this.supplier)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Supplier is updated with identifier ' + param.id;
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
      this.supplierService()
        .create(this.supplier)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Supplier is created with identifier ' + param.id;
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

  public retrieveSupplier(supplierId): void {
    this.supplierService()
      .find(supplierId)
      .then(res => {
        this.supplier = res;
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
  }
}
