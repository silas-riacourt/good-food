import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import MenuService from '@/entities/menu/menu.service';
import { IMenu } from '@/shared/model/menu.model';

import { IItem, Item } from '@/shared/model/item.model';
import ItemService from './item.service';

const validations: any = {
  item: {
    name: {},
    description: {},
    price: {},
    image: {},
  },
};

@Component({
  validations,
})
export default class ItemUpdate extends Vue {
  @Inject('itemService') private itemService: () => ItemService;
  @Inject('alertService') private alertService: () => AlertService;

  public item: IItem = new Item();

  @Inject('menuService') private menuService: () => MenuService;

  public menus: IMenu[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.itemId) {
        vm.retrieveItem(to.params.itemId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.item.id) {
      this.itemService()
        .update(this.item)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Item is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.itemService()
        .create(this.item)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Item is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveItem(itemId): void {
    this.itemService()
      .find(itemId)
      .then(res => {
        this.item = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.menuService()
      .retrieve()
      .then(res => {
        this.menus = res.data;
      });
  }
}
