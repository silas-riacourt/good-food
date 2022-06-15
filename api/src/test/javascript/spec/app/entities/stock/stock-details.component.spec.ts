/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import StockDetailComponent from '@/entities/stock/stock-details.vue';
import StockClass from '@/entities/stock/stock-details.component';
import StockService from '@/entities/stock/stock.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Stock Management Detail Component', () => {
    let wrapper: Wrapper<StockClass>;
    let comp: StockClass;
    let stockServiceStub: SinonStubbedInstance<StockService>;

    beforeEach(() => {
      stockServiceStub = sinon.createStubInstance<StockService>(StockService);

      wrapper = shallowMount<StockClass>(StockDetailComponent, {
        store,
        localVue,
        router,
        provide: { stockService: () => stockServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundStock = { id: 123 };
        stockServiceStub.find.resolves(foundStock);

        // WHEN
        comp.retrieveStock(123);
        await comp.$nextTick();

        // THEN
        expect(comp.stock).toBe(foundStock);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundStock = { id: 123 };
        stockServiceStub.find.resolves(foundStock);

        // WHEN
        comp.beforeRouteEnter({ params: { stockId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.stock).toBe(foundStock);
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
