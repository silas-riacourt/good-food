/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CategorieUpdateComponent from '@/entities/categorie/categorie-update.vue';
import CategorieClass from '@/entities/categorie/categorie-update.component';
import CategorieService from '@/entities/categorie/categorie.service';

import ProductService from '@/entities/product/product.service';

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
  describe('Categorie Management Update Component', () => {
    let wrapper: Wrapper<CategorieClass>;
    let comp: CategorieClass;
    let categorieServiceStub: SinonStubbedInstance<CategorieService>;

    beforeEach(() => {
      categorieServiceStub = sinon.createStubInstance<CategorieService>(CategorieService);

      wrapper = shallowMount<CategorieClass>(CategorieUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          categorieService: () => categorieServiceStub,
          alertService: () => new AlertService(),

          productService: () =>
            sinon.createStubInstance<ProductService>(ProductService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

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
        comp.categorie = entity;
        categorieServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(categorieServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.categorie = entity;
        categorieServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(categorieServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCategorie = { id: 123 };
        categorieServiceStub.find.resolves(foundCategorie);
        categorieServiceStub.retrieve.resolves([foundCategorie]);

        // WHEN
        comp.beforeRouteEnter({ params: { categorieId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.categorie).toBe(foundCategorie);
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
