import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductOrder } from '@/shared/model/product-order.model';
import ProductOrderService from './product-order.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ProductOrderDetails extends Vue {
  @Inject('productOrderService') private productOrderService: () => ProductOrderService;
  @Inject('alertService') private alertService: () => AlertService;

  public productOrder: IProductOrder = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productOrderId) {
        vm.retrieveProductOrder(to.params.productOrderId);
      }
    });
  }

  public retrieveProductOrder(productOrderId) {
    this.productOrderService()
      .find(productOrderId)
      .then(res => {
        this.productOrder = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
