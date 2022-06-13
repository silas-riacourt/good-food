import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMenu } from '@/shared/model/menu.model';
import MenuService from './menu.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class MenuDetails extends Vue {
  @Inject('menuService') private menuService: () => MenuService;
  @Inject('alertService') private alertService: () => AlertService;

  public menu: IMenu = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.menuId) {
        vm.retrieveMenu(to.params.menuId);
      }
    });
  }

  public retrieveMenu(menuId) {
    this.menuService()
      .find(menuId)
      .then(res => {
        this.menu = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
