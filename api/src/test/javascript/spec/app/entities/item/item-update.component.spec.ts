/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ItemUpdateComponent from '@/entities/item/item-update.vue';
import ItemClass from '@/entities/item/item-update.component';
import ItemService from '@/entities/item/item.service';

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
  describe('Item Management Update Component', () => {
    let wrapper: Wrapper<ItemClass>;
    let comp: ItemClass;
    let itemServiceStub: SinonStubbedInstance<ItemService>;

    beforeEach(() => {
      itemServiceStub = sinon.createStubInstance<ItemService>(ItemService);

      wrapper = shallowMount<ItemClass>(ItemUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          itemService: () => itemServiceStub,
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
        comp.item = entity;
        itemServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(itemServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.item = entity;
        itemServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(itemServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundItem = { id: 123 };
        itemServiceStub.find.resolves(foundItem);
        itemServiceStub.retrieve.resolves([foundItem]);

        // WHEN
        comp.beforeRouteEnter({ params: { itemId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.item).toBe(foundItem);
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
