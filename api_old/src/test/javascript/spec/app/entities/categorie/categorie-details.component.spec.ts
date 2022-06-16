/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CategorieDetailComponent from '@/entities/categorie/categorie-details.vue';
import CategorieClass from '@/entities/categorie/categorie-details.component';
import CategorieService from '@/entities/categorie/categorie.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Categorie Management Detail Component', () => {
    let wrapper: Wrapper<CategorieClass>;
    let comp: CategorieClass;
    let categorieServiceStub: SinonStubbedInstance<CategorieService>;

    beforeEach(() => {
      categorieServiceStub = sinon.createStubInstance<CategorieService>(CategorieService);

      wrapper = shallowMount<CategorieClass>(CategorieDetailComponent, {
        store,
        localVue,
        router,
        provide: { categorieService: () => categorieServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCategorie = { id: 123 };
        categorieServiceStub.find.resolves(foundCategorie);

        // WHEN
        comp.retrieveCategorie(123);
        await comp.$nextTick();

        // THEN
        expect(comp.categorie).toBe(foundCategorie);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCategorie = { id: 123 };
        categorieServiceStub.find.resolves(foundCategorie);

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
