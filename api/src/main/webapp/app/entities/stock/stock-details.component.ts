import { Component, Vue, Inject } from 'vue-property-decorator';

import { IStock } from '@/shared/model/stock.model';
import StockService from './stock.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class StockDetails extends Vue {
  @Inject('stockService') private stockService: () => StockService;
  @Inject('alertService') private alertService: () => AlertService;

  public stock: IStock = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.stockId) {
        vm.retrieveStock(to.params.stockId);
      }
    });
  }

  public retrieveStock(stockId) {
    this.stockService()
      .find(stockId)
      .then(res => {
        this.stock = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
