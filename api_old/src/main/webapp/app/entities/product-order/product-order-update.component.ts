import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minValue, decimal } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import OrderService from '@/entities/order/order.service';
import { IOrder } from '@/shared/model/order.model';

import { IProductOrder, ProductOrder } from '@/shared/model/product-order.model';
import ProductOrderService from './product-order.service';

const validations: any = {
  productOrder: {
    quantity: {
      required,
      numeric,
      min: minValue(0),
    },
    totalPrice: {
      required,
      decimal,
      min: minValue(0),
    },
    product: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ProductOrderUpdate extends Vue {
  @Inject('productOrderService') private productOrderService: () => ProductOrderService;
  @Inject('alertService') private alertService: () => AlertService;

  public productOrder: IProductOrder = new ProductOrder();

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];

  @Inject('orderService') private orderService: () => OrderService;

  public orders: IOrder[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productOrderId) {
        vm.retrieveProductOrder(to.params.productOrderId);
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
    if (this.productOrder.id) {
      this.productOrderService()
        .update(this.productOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductOrder is updated with identifier ' + param.id;
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
      this.productOrderService()
        .create(this.productOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductOrder is created with identifier ' + param.id;
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

  public retrieveProductOrder(productOrderId): void {
    this.productOrderService()
      .find(productOrderId)
      .then(res => {
        this.productOrder = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
    this.orderService()
      .retrieve()
      .then(res => {
        this.orders = res.data;
      });
  }
}
