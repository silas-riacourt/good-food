import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IManager } from '@/shared/model/manager.model';

import ManagerService from './manager.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Manager extends Vue {
  @Inject('managerService') private managerService: () => ManagerService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public managers: IManager[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllManagers();
  }

  public clear(): void {
    this.retrieveAllManagers();
  }

  public retrieveAllManagers(): void {
    this.isFetching = true;
    this.managerService()
      .retrieve()
      .then(
        res => {
          this.managers = res.data;
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

  public prepareRemove(instance: IManager): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeManager(): void {
    this.managerService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Manager is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllManagers();
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
