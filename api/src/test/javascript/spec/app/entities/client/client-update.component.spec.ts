/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ClientUpdateComponent from '@/entities/client/client-update.vue';
import ClientClass from '@/entities/client/client-update.component';
import ClientService from '@/entities/client/client.service';

import UserService from '@/entities/user/user.service';

import OrderService from '@/entities/order/order.service';
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
  describe('Client Management Update Component', () => {
    let wrapper: Wrapper<ClientClass>;
    let comp: ClientClass;
    let clientServiceStub: SinonStubbedInstance<ClientService>;

    beforeEach(() => {
      clientServiceStub = sinon.createStubInstance<ClientService>(ClientService);

      wrapper = shallowMount<ClientClass>(ClientUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          clientService: () => clientServiceStub,
          alertService: () => new AlertService(),

          userService: () => new UserService(),

          orderService: () =>
            sinon.createStubInstance<OrderService>(OrderService, {
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
        comp.client = entity;
        clientServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(clientServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.client = entity;
        clientServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(clientServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundClient = { id: 123 };
        clientServiceStub.find.resolves(foundClient);
        clientServiceStub.retrieve.resolves([foundClient]);

        // WHEN
        comp.beforeRouteEnter({ params: { clientId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.client).toBe(foundClient);
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
