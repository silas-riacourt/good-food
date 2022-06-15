/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import IngredientUpdateComponent from '@/entities/ingredient/ingredient-update.vue';
import IngredientClass from '@/entities/ingredient/ingredient-update.component';
import IngredientService from '@/entities/ingredient/ingredient.service';

import SupplierService from '@/entities/supplier/supplier.service';

import StockService from '@/entities/stock/stock.service';

import ProductService from '@/entities/product/product.service';
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
  describe('Ingredient Management Update Component', () => {
    let wrapper: Wrapper<IngredientClass>;
    let comp: IngredientClass;
    let ingredientServiceStub: SinonStubbedInstance<IngredientService>;

    beforeEach(() => {
      ingredientServiceStub = sinon.createStubInstance<IngredientService>(IngredientService);

      wrapper = shallowMount<IngredientClass>(IngredientUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          ingredientService: () => ingredientServiceStub,
          alertService: () => new AlertService(),

          supplierService: () =>
            sinon.createStubInstance<SupplierService>(SupplierService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          stockService: () =>
            sinon.createStubInstance<StockService>(StockService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          productService: () =>
            sinon.createStubInstance<ProductService>(ProductService, {
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
        comp.ingredient = entity;
        ingredientServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ingredientServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.ingredient = entity;
        ingredientServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ingredientServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundIngredient = { id: 123 };
        ingredientServiceStub.find.resolves(foundIngredient);
        ingredientServiceStub.retrieve.resolves([foundIngredient]);

        // WHEN
        comp.beforeRouteEnter({ params: { ingredientId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.ingredient).toBe(foundIngredient);
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
