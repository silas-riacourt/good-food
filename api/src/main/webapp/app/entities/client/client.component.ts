import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IClient } from '@/shared/model/client.model';

import ClientService from './client.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Client extends Vue {
  @Inject('clientService') private clientService: () => ClientService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public clients: IClient[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllClients();
  }

  public clear(): void {
    this.retrieveAllClients();
  }

  public retrieveAllClients(): void {
    this.isFetching = true;
    this.clientService()
      .retrieve()
      .then(
        res => {
          this.clients = res.data;
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

  public prepareRemove(instance: IClient): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeClient(): void {
    this.clientService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Client is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllClients();
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
