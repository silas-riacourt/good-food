/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import RestaurantComponent from '@/entities/restaurant/restaurant.vue';
import RestaurantClass from '@/entities/restaurant/restaurant.component';
import RestaurantService from '@/entities/restaurant/restaurant.service';
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
  describe('Restaurant Management Component', () => {
    let wrapper: Wrapper<RestaurantClass>;
    let comp: RestaurantClass;
    let restaurantServiceStub: SinonStubbedInstance<RestaurantService>;

    beforeEach(() => {
      restaurantServiceStub = sinon.createStubInstance<RestaurantService>(RestaurantService);
      restaurantServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<RestaurantClass>(RestaurantComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          restaurantService: () => restaurantServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      restaurantServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllRestaurants();
      await comp.$nextTick();

      // THEN
      expect(restaurantServiceStub.retrieve.called).toBeTruthy();
      expect(comp.restaurants[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      restaurantServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(restaurantServiceStub.retrieve.callCount).toEqual(1);

      comp.removeRestaurant();
      await comp.$nextTick();

      // THEN
      expect(restaurantServiceStub.delete.called).toBeTruthy();
      expect(restaurantServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
