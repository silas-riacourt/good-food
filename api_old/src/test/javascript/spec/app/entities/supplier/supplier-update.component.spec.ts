/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import SupplierUpdateComponent from '@/entities/supplier/supplier-update.vue';
import SupplierClass from '@/entities/supplier/supplier-update.component';
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
  describe('Supplier Management Update Component', () => {
    let wrapper: Wrapper<SupplierClass>;
    let comp: SupplierClass;
    let supplierServiceStub: SinonStubbedInstance<SupplierService>;

    beforeEach(() => {
      supplierServiceStub = sinon.createStubInstance<SupplierService>(SupplierService);

      wrapper = shallowMount<SupplierClass>(SupplierUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          supplierService: () => supplierServiceStub,
          alertService: () => new AlertService(),

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
        comp.supplier = entity;
        supplierServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(supplierServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.supplier = entity;
        supplierServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(supplierServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundSupplier = { id: 123 };
        supplierServiceStub.find.resolves(foundSupplier);
        supplierServiceStub.retrieve.resolves([foundSupplier]);

        // WHEN
        comp.beforeRouteEnter({ params: { supplierId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.supplier).toBe(foundSupplier);
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
