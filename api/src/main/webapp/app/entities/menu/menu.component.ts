import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IMenu } from '@/shared/model/menu.model';

import MenuService from './menu.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Menu extends Vue {
  @Inject('menuService') private menuService: () => MenuService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public menus: IMenu[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllMenus();
  }

  public clear(): void {
    this.retrieveAllMenus();
  }

  public retrieveAllMenus(): void {
    this.isFetching = true;
    this.menuService()
      .retrieve()
      .then(
        res => {
          this.menus = res.data;
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

  public prepareRemove(instance: IMenu): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeMenu(): void {
    this.menuService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Menu is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllMenus();
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
