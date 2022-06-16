import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ISupplier } from '@/shared/model/supplier.model';

import SupplierService from './supplier.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Supplier extends Vue {
  @Inject('supplierService') private supplierService: () => SupplierService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public suppliers: ISupplier[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllSuppliers();
  }

  public clear(): void {
    this.retrieveAllSuppliers();
  }

  public retrieveAllSuppliers(): void {
    this.isFetching = true;
    this.supplierService()
      .retrieve()
      .then(
        res => {
          this.suppliers = res.data;
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

  public prepareRemove(instance: ISupplier): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeSupplier(): void {
    this.supplierService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Supplier is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllSuppliers();
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
