/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import SupplierDetailComponent from '@/entities/supplier/supplier-details.vue';
import SupplierClass from '@/entities/supplier/supplier-details.component';
import SupplierService from '@/entities/supplier/supplier.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Supplier Management Detail Component', () => {
    let wrapper: Wrapper<SupplierClass>;
    let comp: SupplierClass;
    let supplierServiceStub: SinonStubbedInstance<SupplierService>;

    beforeEach(() => {
      supplierServiceStub = sinon.createStubInstance<SupplierService>(SupplierService);

      wrapper = shallowMount<SupplierClass>(SupplierDetailComponent, {
        store,
        localVue,
        router,
        provide: { supplierService: () => supplierServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundSupplier = { id: 123 };
        supplierServiceStub.find.resolves(foundSupplier);

        // WHEN
        comp.retrieveSupplier(123);
        await comp.$nextTick();

        // THEN
        expect(comp.supplier).toBe(foundSupplier);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundSupplier = { id: 123 };
        supplierServiceStub.find.resolves(foundSupplier);

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
