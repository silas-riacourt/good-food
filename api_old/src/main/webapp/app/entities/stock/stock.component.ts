import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IStock } from '@/shared/model/stock.model';

import StockService from './stock.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Stock extends Vue {
  @Inject('stockService') private stockService: () => StockService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public stocks: IStock[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllStocks();
  }

  public clear(): void {
    this.retrieveAllStocks();
  }

  public retrieveAllStocks(): void {
    this.isFetching = true;
    this.stockService()
      .retrieve()
      .then(
        res => {
          this.stocks = res.data;
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

  public prepareRemove(instance: IStock): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeStock(): void {
    this.stockService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Stock is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllStocks();
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
