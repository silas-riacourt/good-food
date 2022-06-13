/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import MenuComponent from '@/entities/menu/menu.vue';
import MenuClass from '@/entities/menu/menu.component';
import MenuService from '@/entities/menu/menu.service';
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
  describe('Menu Management Component', () => {
    let wrapper: Wrapper<MenuClass>;
    let comp: MenuClass;
    let menuServiceStub: SinonStubbedInstance<MenuService>;

    beforeEach(() => {
      menuServiceStub = sinon.createStubInstance<MenuService>(MenuService);
      menuServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MenuClass>(MenuComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          menuService: () => menuServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      menuServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllMenus();
      await comp.$nextTick();

      // THEN
      expect(menuServiceStub.retrieve.called).toBeTruthy();
      expect(comp.menus[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      menuServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(menuServiceStub.retrieve.callCount).toEqual(1);

      comp.removeMenu();
      await comp.$nextTick();

      // THEN
      expect(menuServiceStub.delete.called).toBeTruthy();
      expect(menuServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
