import { Component, Vue, Inject } from 'vue-property-decorator';

import { IManager } from '@/shared/model/manager.model';
import ManagerService from './manager.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ManagerDetails extends Vue {
  @Inject('managerService') private managerService: () => ManagerService;
  @Inject('alertService') private alertService: () => AlertService;

  public manager: IManager = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.managerId) {
        vm.retrieveManager(to.params.managerId);
      }
    });
  }

  public retrieveManager(managerId) {
    this.managerService()
      .find(managerId)
      .then(res => {
        this.manager = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
