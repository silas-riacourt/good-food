/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CategorieComponent from '@/entities/categorie/categorie.vue';
import CategorieClass from '@/entities/categorie/categorie.component';
import CategorieService from '@/entities/categorie/categorie.service';
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
  describe('Categorie Management Component', () => {
    let wrapper: Wrapper<CategorieClass>;
    let comp: CategorieClass;
    let categorieServiceStub: SinonStubbedInstance<CategorieService>;

    beforeEach(() => {
      categorieServiceStub = sinon.createStubInstance<CategorieService>(CategorieService);
      categorieServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CategorieClass>(CategorieComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          categorieService: () => categorieServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      categorieServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCategories();
      await comp.$nextTick();

      // THEN
      expect(categorieServiceStub.retrieve.called).toBeTruthy();
      expect(comp.categories[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      categorieServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(categorieServiceStub.retrieve.callCount).toEqual(1);

      comp.removeCategorie();
      await comp.$nextTick();

      // THEN
      expect(categorieServiceStub.delete.called).toBeTruthy();
      expect(categorieServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
