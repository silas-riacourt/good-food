/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import IngredientOrderUpdateComponent from '@/entities/ingredient-order/ingredient-order-update.vue';
import IngredientOrderClass from '@/entities/ingredient-order/ingredient-order-update.component';
import IngredientOrderService from '@/entities/ingredient-order/ingredient-order.service';

import SupplierService from '@/entities/supplier/supplier.service';

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
  describe('IngredientOrder Management Update Component', () => {
    let wrapper: Wrapper<IngredientOrderClass>;
    let comp: IngredientOrderClass;
    let ingredientOrderServiceStub: SinonStubbedInstance<IngredientOrderService>;

    beforeEach(() => {
      ingredientOrderServiceStub = sinon.createStubInstance<IngredientOrderService>(IngredientOrderService);

      wrapper = shallowMount<IngredientOrderClass>(IngredientOrderUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          ingredientOrderService: () => ingredientOrderServiceStub,
          alertService: () => new AlertService(),

          supplierService: () =>
            sinon.createStubInstance<SupplierService>(SupplierService, {
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
        comp.ingredientOrder = entity;
        ingredientOrderServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ingredientOrderServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.ingredientOrder = entity;
        ingredientOrderServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ingredientOrderServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundIngredientOrder = { id: 123 };
        ingredientOrderServiceStub.find.resolves(foundIngredientOrder);
        ingredientOrderServiceStub.retrieve.resolves([foundIngredientOrder]);

        // WHEN
        comp.beforeRouteEnter({ params: { ingredientOrderId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.ingredientOrder).toBe(foundIngredientOrder);
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
