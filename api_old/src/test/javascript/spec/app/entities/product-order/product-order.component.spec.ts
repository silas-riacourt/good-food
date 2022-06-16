/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ProductOrderComponent from '@/entities/product-order/product-order.vue';
import ProductOrderClass from '@/entities/product-order/product-order.component';
import ProductOrderService from '@/entities/product-order/product-order.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('ProductOrder Management Component', () => {
    let wrapper: Wrapper<ProductOrderClass>;
    let comp: ProductOrderClass;
    let productOrderServiceStub: SinonStubbedInstance<ProductOrderService>;

    beforeEach(() => {
      productOrderServiceStub = sinon.createStubInstance<ProductOrderService>(ProductOrderService);
      productOrderServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProductOrderClass>(ProductOrderComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          productOrderService: () => productOrderServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      productOrderServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProductOrders();
      await comp.$nextTick();

      // THEN
      expect(productOrderServiceStub.retrieve.called).toBeTruthy();
      expect(comp.productOrders[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      productOrderServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(productOrderServiceStub.retrieve.callCount).toEqual(1);

      comp.removeProductOrder();
      await comp.$nextTick();

      // THEN
      expect(productOrderServiceStub.delete.called).toBeTruthy();
      expect(productOrderServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
