/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ManagerDetailComponent from '@/entities/manager/manager-details.vue';
import ManagerClass from '@/entities/manager/manager-details.component';
import ManagerService from '@/entities/manager/manager.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Manager Management Detail Component', () => {
    let wrapper: Wrapper<ManagerClass>;
    let comp: ManagerClass;
    let managerServiceStub: SinonStubbedInstance<ManagerService>;

    beforeEach(() => {
      managerServiceStub = sinon.createStubInstance<ManagerService>(ManagerService);

      wrapper = shallowMount<ManagerClass>(ManagerDetailComponent, {
        store,
        localVue,
        router,
        provide: { managerService: () => managerServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundManager = { id: 123 };
        managerServiceStub.find.resolves(foundManager);

        // WHEN
        comp.retrieveManager(123);
        await comp.$nextTick();

        // THEN
        expect(comp.manager).toBe(foundManager);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundManager = { id: 123 };
        managerServiceStub.find.resolves(foundManager);

        // WHEN
        comp.beforeRouteEnter({ params: { managerId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.manager).toBe(foundManager);
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
