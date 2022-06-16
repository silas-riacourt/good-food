import { Component, Vue, Inject } from 'vue-property-decorator';

import { decimal, required, minValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import RestaurantService from '@/entities/restaurant/restaurant.service';
import { IRestaurant } from '@/shared/model/restaurant.model';

import ProductOrderService from '@/entities/product-order/product-order.service';
import { IProductOrder } from '@/shared/model/product-order.model';

import ClientService from '@/entities/client/client.service';
import { IClient } from '@/shared/model/client.model';

import { IOrder, Order } from '@/shared/model/order.model';
import OrderService from './order.service';
import { OrderStatus } from '@/shared/model/enumerations/order-status.model';
import { PaymentMethod } from '@/shared/model/enumerations/payment-method.model';

const validations: any = {
  order: {
    name: {},
    totalPrice: {
      required,
      decimal,
      min: minValue(0),
    },
    date: {},
    status: {},
    paymentMethod: {},
  },
};

@Component({
  validations,
})
export default class OrderUpdate extends Vue {
  @Inject('orderService') private orderService: () => OrderService;
  @Inject('alertService') private alertService: () => AlertService;

  public order: IOrder = new Order();

  @Inject('restaurantService') private restaurantService: () => RestaurantService;

  public restaurants: IRestaurant[] = [];

  @Inject('productOrderService') private productOrderService: () => ProductOrderService;

  public productOrders: IProductOrder[] = [];

  @Inject('clientService') private clientService: () => ClientService;

  public clients: IClient[] = [];
  public orderStatusValues: string[] = Object.keys(OrderStatus);
  public paymentMethodValues: string[] = Object.keys(PaymentMethod);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.orderId) {
        vm.retrieveOrder(to.params.orderId);
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
    if (this.order.id) {
      this.orderService()
        .update(this.order)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Order is updated with identifier ' + param.id;
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
      this.orderService()
        .create(this.order)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Order is created with identifier ' + param.id;
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

  public retrieveOrder(orderId): void {
    this.orderService()
      .find(orderId)
      .then(res => {
        this.order = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.restaurantService()
      .retrieve()
      .then(res => {
        this.restaurants = res.data;
      });
    this.productOrderService()
      .retrieve()
      .then(res => {
        this.productOrders = res.data;
      });
    this.clientService()
      .retrieve()
      .then(res => {
        this.clients = res.data;
      });
  }
}
