/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import RestaurantUpdateComponent from '@/entities/restaurant/restaurant-update.vue';
import RestaurantClass from '@/entities/restaurant/restaurant-update.component';
import RestaurantService from '@/entities/restaurant/restaurant.service';

import MenuService from '@/entities/menu/menu.service';
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
  describe('Restaurant Management Update Component', () => {
    let wrapper: Wrapper<RestaurantClass>;
    let comp: RestaurantClass;
    let restaurantServiceStub: SinonStubbedInstance<RestaurantService>;

    beforeEach(() => {
      restaurantServiceStub = sinon.createStubInstance<RestaurantService>(RestaurantService);

      wrapper = shallowMount<RestaurantClass>(RestaurantUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          restaurantService: () => restaurantServiceStub,
          alertService: () => new AlertService(),

          menuService: () =>
            sinon.createStubInstance<MenuService>(MenuService, {
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
        comp.restaurant = entity;
        restaurantServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(restaurantServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.restaurant = entity;
        restaurantServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(restaurantServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRestaurant = { id: 123 };
        restaurantServiceStub.find.resolves(foundRestaurant);
        restaurantServiceStub.retrieve.resolves([foundRestaurant]);

        // WHEN
        comp.beforeRouteEnter({ params: { restaurantId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.restaurant).toBe(foundRestaurant);
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
