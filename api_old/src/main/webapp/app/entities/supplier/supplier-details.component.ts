import { Component, Vue, Inject } from 'vue-property-decorator';

import { ISupplier } from '@/shared/model/supplier.model';
import SupplierService from './supplier.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class SupplierDetails extends Vue {
  @Inject('supplierService') private supplierService: () => SupplierService;
  @Inject('alertService') private alertService: () => AlertService;

  public supplier: ISupplier = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.supplierId) {
        vm.retrieveSupplier(to.params.supplierId);
      }
    });
  }

  public retrieveSupplier(supplierId) {
    this.supplierService()
      .find(supplierId)
      .then(res => {
        this.supplier = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
