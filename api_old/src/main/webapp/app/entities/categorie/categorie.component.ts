import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICategorie } from '@/shared/model/categorie.model';

import CategorieService from './categorie.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Categorie extends Vue {
  @Inject('categorieService') private categorieService: () => CategorieService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public categories: ICategorie[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCategories();
  }

  public clear(): void {
    this.retrieveAllCategories();
  }

  public retrieveAllCategories(): void {
    this.isFetching = true;
    this.categorieService()
      .retrieve()
      .then(
        res => {
          this.categories = res.data;
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

  public prepareRemove(instance: ICategorie): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCategorie(): void {
    this.categorieService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Categorie is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCategories();
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
