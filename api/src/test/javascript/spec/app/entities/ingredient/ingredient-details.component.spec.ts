/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import IngredientDetailComponent from '@/entities/ingredient/ingredient-details.vue';
import IngredientClass from '@/entities/ingredient/ingredient-details.component';
import IngredientService from '@/entities/ingredient/ingredient.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Ingredient Management Detail Component', () => {
    let wrapper: Wrapper<IngredientClass>;
    let comp: IngredientClass;
    let ingredientServiceStub: SinonStubbedInstance<IngredientService>;

    beforeEach(() => {
      ingredientServiceStub = sinon.createStubInstance<IngredientService>(IngredientService);

      wrapper = shallowMount<IngredientClass>(IngredientDetailComponent, {
        store,
        localVue,
        router,
        provide: { ingredientService: () => ingredientServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundIngredient = { id: 123 };
        ingredientServiceStub.find.resolves(foundIngredient);

        // WHEN
        comp.retrieveIngredient(123);
        await comp.$nextTick();

        // THEN
        expect(comp.ingredient).toBe(foundIngredient);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundIngredient = { id: 123 };
        ingredientServiceStub.find.resolves(foundIngredient);

        // WHEN
        comp.beforeRouteEnter({ params: { ingredientId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.ingredient).toBe(foundIngredient);
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
