/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import StockUpdateComponent from '@/entities/stock/stock-update.vue';
import StockClass from '@/entities/stock/stock-update.component';
import StockService from '@/entities/stock/stock.service';

import RestaurantService from '@/entities/restaurant/restaurant.service';

import IngredientService from '@/entities/ingredient/ingredient.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Stock Management Update Component', () => {
    let wrapper: Wrapper<StockClass>;
    let comp: StockClass;
    let stockServiceStub: SinonStubbedInstance<StockService>;

    beforeEach(() => {
      stockServiceStub = sinon.createStubInstance<StockService>(StockService);

      wrapper = shallowMount<StockClass>(StockUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          stockService: () => stockServiceStub,
          alertService: () => new AlertService(),

          restaurantService: () =>
            sinon.createStubInstance<RestaurantService>(RestaurantService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          ingredientService: () =>
            sinon.createStubInstance<IngredientService>(IngredientService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.stock = entity;
        stockServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(stockServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.stock = entity;
        stockServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(stockServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundStock = { id: 123 };
        stockServiceStub.find.resolves(foundStock);
        stockServiceStub.retrieve.resolves([foundStock]);

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
