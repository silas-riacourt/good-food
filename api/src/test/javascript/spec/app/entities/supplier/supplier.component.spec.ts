/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import SupplierComponent from '@/entities/supplier/supplier.vue';
import SupplierClass from '@/entities/supplier/supplier.component';
import SupplierService from '@/entities/supplier/supplier.service';
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
  describe('Supplier Management Component', () => {
    let wrapper: Wrapper<SupplierClass>;
    let comp: SupplierClass;
    let supplierServiceStub: SinonStubbedInstance<SupplierService>;

    beforeEach(() => {
      supplierServiceStub = sinon.createStubInstance<SupplierService>(SupplierService);
      supplierServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<SupplierClass>(SupplierComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          supplierService: () => supplierServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      supplierServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllSuppliers();
      await comp.$nextTick();

      // THEN
      expect(supplierServiceStub.retrieve.called).toBeTruthy();
      expect(comp.suppliers[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      supplierServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(supplierServiceStub.retrieve.callCount).toEqual(1);

      comp.removeSupplier();
      await comp.$nextTick();

      // THEN
      expect(supplierServiceStub.delete.called).toBeTruthy();
      expect(supplierServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
