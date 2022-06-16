/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import RestaurantDetailComponent from '@/entities/restaurant/restaurant-details.vue';
import RestaurantClass from '@/entities/restaurant/restaurant-details.component';
import RestaurantService from '@/entities/restaurant/restaurant.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Restaurant Management Detail Component', () => {
    let wrapper: Wrapper<RestaurantClass>;
    let comp: RestaurantClass;
    let restaurantServiceStub: SinonStubbedInstance<RestaurantService>;

    beforeEach(() => {
      restaurantServiceStub = sinon.createStubInstance<RestaurantService>(RestaurantService);

      wrapper = shallowMount<RestaurantClass>(RestaurantDetailComponent, {
        store,
        localVue,
        router,
        provide: { restaurantService: () => restaurantServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundRestaurant = { id: 123 };
        restaurantServiceStub.find.resolves(foundRestaurant);

        // WHEN
        comp.retrieveRestaurant(123);
        await comp.$nextTick();

        // THEN
        expect(comp.restaurant).toBe(foundRestaurant);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRestaurant = { id: 123 };
        restaurantServiceStub.find.resolves(foundRestaurant);

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
