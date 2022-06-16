/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ClientComponent from '@/entities/client/client.vue';
import ClientClass from '@/entities/client/client.component';
import ClientService from '@/entities/client/client.service';
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
  describe('Client Management Component', () => {
    let wrapper: Wrapper<ClientClass>;
    let comp: ClientClass;
    let clientServiceStub: SinonStubbedInstance<ClientService>;

    beforeEach(() => {
      clientServiceStub = sinon.createStubInstance<ClientService>(ClientService);
      clientServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ClientClass>(ClientComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          clientService: () => clientServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      clientServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllClients();
      await comp.$nextTick();

      // THEN
      expect(clientServiceStub.retrieve.called).toBeTruthy();
      expect(comp.clients[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      clientServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(clientServiceStub.retrieve.callCount).toEqual(1);

      comp.removeClient();
      await comp.$nextTick();

      // THEN
      expect(clientServiceStub.delete.called).toBeTruthy();
      expect(clientServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
