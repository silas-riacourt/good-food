/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import MenuUpdateComponent from '@/entities/menu/menu-update.vue';
import MenuClass from '@/entities/menu/menu-update.component';
import MenuService from '@/entities/menu/menu.service';

import ItemService from '@/entities/item/item.service';

import RestaurantService from '@/entities/restaurant/restaurant.service';

import CategorieService from '@/entities/categorie/categorie.service';
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
  describe('Menu Management Update Component', () => {
    let wrapper: Wrapper<MenuClass>;
    let comp: MenuClass;
    let menuServiceStub: SinonStubbedInstance<MenuService>;

    beforeEach(() => {
      menuServiceStub = sinon.createStubInstance<MenuService>(MenuService);

      wrapper = shallowMount<MenuClass>(MenuUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          menuService: () => menuServiceStub,
          alertService: () => new AlertService(),

          itemService: () =>
            sinon.createStubInstance<ItemService>(ItemService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          restaurantService: () =>
            sinon.createStubInstance<RestaurantService>(RestaurantService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          categorieService: () =>
            sinon.createStubInstance<CategorieService>(CategorieService, {
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
        comp.menu = entity;
        menuServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(menuServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.menu = entity;
        menuServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(menuServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMenu = { id: 123 };
        menuServiceStub.find.resolves(foundMenu);
        menuServiceStub.retrieve.resolves([foundMenu]);

        // WHEN
        comp.beforeRouteEnter({ params: { menuId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.menu).toBe(foundMenu);
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
