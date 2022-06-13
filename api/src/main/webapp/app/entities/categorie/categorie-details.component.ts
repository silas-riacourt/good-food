import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICategorie } from '@/shared/model/categorie.model';
import CategorieService from './categorie.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CategorieDetails extends Vue {
  @Inject('categorieService') private categorieService: () => CategorieService;
  @Inject('alertService') private alertService: () => AlertService;

  public categorie: ICategorie = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.categorieId) {
        vm.retrieveCategorie(to.params.categorieId);
      }
    });
  }

  public retrieveCategorie(categorieId) {
    this.categorieService()
      .find(categorieId)
      .then(res => {
        this.categorie = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
