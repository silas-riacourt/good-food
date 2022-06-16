/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ManagerComponent from '@/entities/manager/manager.vue';
import ManagerClass from '@/entities/manager/manager.component';
import ManagerService from '@/entities/manager/manager.service';
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
  describe('Manager Management Component', () => {
    let wrapper: Wrapper<ManagerClass>;
    let comp: ManagerClass;
    let managerServiceStub: SinonStubbedInstance<ManagerService>;

    beforeEach(() => {
      managerServiceStub = sinon.createStubInstance<ManagerService>(ManagerService);
      managerServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ManagerClass>(ManagerComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          managerService: () => managerServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      managerServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllManagers();
      await comp.$nextTick();

      // THEN
      expect(managerServiceStub.retrieve.called).toBeTruthy();
      expect(comp.managers[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      managerServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(managerServiceStub.retrieve.callCount).toEqual(1);

      comp.removeManager();
      await comp.$nextTick();

      // THEN
      expect(managerServiceStub.delete.called).toBeTruthy();
      expect(managerServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
