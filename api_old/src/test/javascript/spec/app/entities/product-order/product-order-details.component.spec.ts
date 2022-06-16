/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProductOrderDetailComponent from '@/entities/product-order/product-order-details.vue';
import ProductOrderClass from '@/entities/product-order/product-order-details.component';
import ProductOrderService from '@/entities/product-order/product-order.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductOrder Management Detail Component', () => {
    let wrapper: Wrapper<ProductOrderClass>;
    let comp: ProductOrderClass;
    let productOrderServiceStub: SinonStubbedInstance<ProductOrderService>;

    beforeEach(() => {
      productOrderServiceStub = sinon.createStubInstance<ProductOrderService>(ProductOrderService);

      wrapper = shallowMount<ProductOrderClass>(ProductOrderDetailComponent, {
        store,
        localVue,
        router,
        provide: { productOrderService: () => productOrderServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductOrder = { id: 123 };
        productOrderServiceStub.find.resolves(foundProductOrder);

        // WHEN
        comp.retrieveProductOrder(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productOrder).toBe(foundProductOrder);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductOrder = { id: 123 };
        productOrderServiceStub.find.resolves(foundProductOrder);

        // WHEN
        comp.beforeRouteEnter({ params: { productOrderId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.productOrder).toBe(foundProductOrder);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
