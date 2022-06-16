/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import IngredientComponent from '@/entities/ingredient/ingredient.vue';
import IngredientClass from '@/entities/ingredient/ingredient.component';
import IngredientService from '@/entities/ingredient/ingredient.service';
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
  describe('Ingredient Management Component', () => {
    let wrapper: Wrapper<IngredientClass>;
    let comp: IngredientClass;
    let ingredientServiceStub: SinonStubbedInstance<IngredientService>;

    beforeEach(() => {
      ingredientServiceStub = sinon.createStubInstance<IngredientService>(IngredientService);
      ingredientServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<IngredientClass>(IngredientComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          ingredientService: () => ingredientServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      ingredientServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllIngredients();
      await comp.$nextTick();

      // THEN
      expect(ingredientServiceStub.retrieve.called).toBeTruthy();
      expect(comp.ingredients[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      ingredientServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(ingredientServiceStub.retrieve.callCount).toEqual(1);

      comp.removeIngredient();
      await comp.$nextTick();

      // THEN
      expect(ingredientServiceStub.delete.called).toBeTruthy();
      expect(ingredientServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
