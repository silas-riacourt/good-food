/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import MenuDetailComponent from '@/entities/menu/menu-details.vue';
import MenuClass from '@/entities/menu/menu-details.component';
import MenuService from '@/entities/menu/menu.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Menu Management Detail Component', () => {
    let wrapper: Wrapper<MenuClass>;
    let comp: MenuClass;
    let menuServiceStub: SinonStubbedInstance<MenuService>;

    beforeEach(() => {
      menuServiceStub = sinon.createStubInstance<MenuService>(MenuService);

      wrapper = shallowMount<MenuClass>(MenuDetailComponent, {
        store,
        localVue,
        router,
        provide: { menuService: () => menuServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMenu = { id: 123 };
        menuServiceStub.find.resolves(foundMenu);

        // WHEN
        comp.retrieveMenu(123);
        await comp.$nextTick();

        // THEN
        expect(comp.menu).toBe(foundMenu);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMenu = { id: 123 };
        menuServiceStub.find.resolves(foundMenu);

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
