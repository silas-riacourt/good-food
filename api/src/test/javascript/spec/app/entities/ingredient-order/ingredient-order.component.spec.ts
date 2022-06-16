/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import IngredientOrderComponent from '@/entities/ingredient-order/ingredient-order.vue';
import IngredientOrderClass from '@/entities/ingredient-order/ingredient-order.component';
import IngredientOrderService from '@/entities/ingredient-order/ingredient-order.service';
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
  describe('IngredientOrder Management Component', () => {
    let wrapper: Wrapper<IngredientOrderClass>;
    let comp: IngredientOrderClass;
    let ingredientOrderServiceStub: SinonStubbedInstance<IngredientOrderService>;

    beforeEach(() => {
      ingredientOrderServiceStub = sinon.createStubInstance<IngredientOrderService>(IngredientOrderService);
      ingredientOrderServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<IngredientOrderClass>(IngredientOrderComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          ingredientOrderService: () => ingredientOrderServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      ingredientOrderServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllIngredientOrders();
      await comp.$nextTick();

      // THEN
      expect(ingredientOrderServiceStub.retrieve.called).toBeTruthy();
      expect(comp.ingredientOrders[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      ingredientOrderServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(ingredientOrderServiceStub.retrieve.callCount).toEqual(1);

      comp.removeIngredientOrder();
      await comp.$nextTick();

      // THEN
      expect(ingredientOrderServiceStub.delete.called).toBeTruthy();
      expect(ingredientOrderServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
