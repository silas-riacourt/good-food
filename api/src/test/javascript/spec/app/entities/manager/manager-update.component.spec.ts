/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ManagerUpdateComponent from '@/entities/manager/manager-update.vue';
import ManagerClass from '@/entities/manager/manager-update.component';
import ManagerService from '@/entities/manager/manager.service';

import UserService from '@/entities/user/user.service';

import RestaurantService from '@/entities/restaurant/restaurant.service';
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
  describe('Manager Management Update Component', () => {
    let wrapper: Wrapper<ManagerClass>;
    let comp: ManagerClass;
    let managerServiceStub: SinonStubbedInstance<ManagerService>;

    beforeEach(() => {
      managerServiceStub = sinon.createStubInstance<ManagerService>(ManagerService);

      wrapper = shallowMount<ManagerClass>(ManagerUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          managerService: () => managerServiceStub,
          alertService: () => new AlertService(),

          userService: () => new UserService(),

          restaurantService: () =>
            sinon.createStubInstance<RestaurantService>(RestaurantService, {
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
        comp.manager = entity;
        managerServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(managerServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.manager = entity;
        managerServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(managerServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundManager = { id: 123 };
        managerServiceStub.find.resolves(foundManager);
        managerServiceStub.retrieve.resolves([foundManager]);

        // WHEN
        comp.beforeRouteEnter({ params: { managerId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.manager).toBe(foundManager);
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
