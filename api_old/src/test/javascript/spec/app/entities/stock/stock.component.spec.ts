/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import StockComponent from '@/entities/stock/stock.vue';
import StockClass from '@/entities/stock/stock.component';
import StockService from '@/entities/stock/stock.service';
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
  describe('Stock Management Component', () => {
    let wrapper: Wrapper<StockClass>;
    let comp: StockClass;
    let stockServiceStub: SinonStubbedInstance<StockService>;

    beforeEach(() => {
      stockServiceStub = sinon.createStubInstance<StockService>(StockService);
      stockServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<StockClass>(StockComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          stockService: () => stockServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      stockServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllStocks();
      await comp.$nextTick();

      // THEN
      expect(stockServiceStub.retrieve.called).toBeTruthy();
      expect(comp.stocks[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      stockServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(stockServiceStub.retrieve.callCount).toEqual(1);

      comp.removeStock();
      await comp.$nextTick();

      // THEN
      expect(stockServiceStub.delete.called).toBeTruthy();
      expect(stockServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
