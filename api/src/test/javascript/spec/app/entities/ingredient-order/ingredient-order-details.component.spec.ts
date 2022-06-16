/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import IngredientOrderDetailComponent from '@/entities/ingredient-order/ingredient-order-details.vue';
import IngredientOrderClass from '@/entities/ingredient-order/ingredient-order-details.component';
import IngredientOrderService from '@/entities/ingredient-order/ingredient-order.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('IngredientOrder Management Detail Component', () => {
    let wrapper: Wrapper<IngredientOrderClass>;
    let comp: IngredientOrderClass;
    let ingredientOrderServiceStub: SinonStubbedInstance<IngredientOrderService>;

    beforeEach(() => {
      ingredientOrderServiceStub = sinon.createStubInstance<IngredientOrderService>(IngredientOrderService);

      wrapper = shallowMount<IngredientOrderClass>(IngredientOrderDetailComponent, {
        store,
        localVue,
        router,
        provide: { ingredientOrderService: () => ingredientOrderServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundIngredientOrder = { id: 123 };
        ingredientOrderServiceStub.find.resolves(foundIngredientOrder);

        // WHEN
        comp.retrieveIngredientOrder(123);
        await comp.$nextTick();

        // THEN
        expect(comp.ingredientOrder).toBe(foundIngredientOrder);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundIngredientOrder = { id: 123 };
        ingredientOrderServiceStub.find.resolves(foundIngredientOrder);

        // WHEN
        comp.beforeRouteEnter({ params: { ingredientOrderId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.ingredientOrder).toBe(foundIngredientOrder);
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
