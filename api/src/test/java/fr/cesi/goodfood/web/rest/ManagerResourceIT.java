package fr.cesi.goodfood.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.cesi.goodfood.IntegrationTest;
import fr.cesi.goodfood.domain.Manager;
import fr.cesi.goodfood.repository.ManagerRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ManagerResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ManagerResourceIT {

    private static final String DEFAULT_FULLNAME = "AAAAAAAAAA";
    private static final String UPDATED_FULLNAME = "BBBBBBBBBB";

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_MAIL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/managers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ManagerRepository managerRepository;

    @Mock
    private ManagerRepository managerRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restManagerMockMvc;

    private Manager manager;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Manager createEntity(EntityManager em) {
        Manager manager = new Manager()
            .fullname(DEFAULT_FULLNAME)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .phone(DEFAULT_PHONE)
            .mail(DEFAULT_MAIL);
        return manager;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Manager createUpdatedEntity(EntityManager em) {
        Manager manager = new Manager()
            .fullname(UPDATED_FULLNAME)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .phone(UPDATED_PHONE)
            .mail(UPDATED_MAIL);
        return manager;
    }

    @BeforeEach
    public void initTest() {
        manager = createEntity(em);
    }

    @Test
    @Transactional
    void createManager() throws Exception {
        int databaseSizeBeforeCreate = managerRepository.findAll().size();
        // Create the Manager
        restManagerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(manager)))
            .andExpect(status().isCreated());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeCreate + 1);
        Manager testManager = managerList.get(managerList.size() - 1);
        assertThat(testManager.getFullname()).isEqualTo(DEFAULT_FULLNAME);
        assertThat(testManager.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testManager.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testManager.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testManager.getMail()).isEqualTo(DEFAULT_MAIL);
    }

    @Test
    @Transactional
    void createManagerWithExistingId() throws Exception {
        // Create the Manager with an existing ID
        manager.setId(1L);

        int databaseSizeBeforeCreate = managerRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restManagerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(manager)))
            .andExpect(status().isBadRequest());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllManagers() throws Exception {
        // Initialize the database
        managerRepository.saveAndFlush(manager);

        // Get all the managerList
        restManagerMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(manager.getId().intValue())))
            .andExpect(jsonPath("$.[*].fullname").value(hasItem(DEFAULT_FULLNAME)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].mail").value(hasItem(DEFAULT_MAIL)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllManagersWithEagerRelationshipsIsEnabled() throws Exception {
        when(managerRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restManagerMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(managerRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllManagersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(managerRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restManagerMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(managerRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getManager() throws Exception {
        // Initialize the database
        managerRepository.saveAndFlush(manager);

        // Get the manager
        restManagerMockMvc
            .perform(get(ENTITY_API_URL_ID, manager.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(manager.getId().intValue()))
            .andExpect(jsonPath("$.fullname").value(DEFAULT_FULLNAME))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.mail").value(DEFAULT_MAIL));
    }

    @Test
    @Transactional
    void getNonExistingManager() throws Exception {
        // Get the manager
        restManagerMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewManager() throws Exception {
        // Initialize the database
        managerRepository.saveAndFlush(manager);

        int databaseSizeBeforeUpdate = managerRepository.findAll().size();

        // Update the manager
        Manager updatedManager = managerRepository.findById(manager.getId()).get();
        // Disconnect from session so that the updates on updatedManager are not directly saved in db
        em.detach(updatedManager);
        updatedManager
            .fullname(UPDATED_FULLNAME)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .phone(UPDATED_PHONE)
            .mail(UPDATED_MAIL);

        restManagerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedManager.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedManager))
            )
            .andExpect(status().isOk());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeUpdate);
        Manager testManager = managerList.get(managerList.size() - 1);
        assertThat(testManager.getFullname()).isEqualTo(UPDATED_FULLNAME);
        assertThat(testManager.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testManager.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testManager.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testManager.getMail()).isEqualTo(UPDATED_MAIL);
    }

    @Test
    @Transactional
    void putNonExistingManager() throws Exception {
        int databaseSizeBeforeUpdate = managerRepository.findAll().size();
        manager.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restManagerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, manager.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(manager))
            )
            .andExpect(status().isBadRequest());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchManager() throws Exception {
        int databaseSizeBeforeUpdate = managerRepository.findAll().size();
        manager.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restManagerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(manager))
            )
            .andExpect(status().isBadRequest());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamManager() throws Exception {
        int databaseSizeBeforeUpdate = managerRepository.findAll().size();
        manager.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restManagerMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(manager)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateManagerWithPatch() throws Exception {
        // Initialize the database
        managerRepository.saveAndFlush(manager);

        int databaseSizeBeforeUpdate = managerRepository.findAll().size();

        // Update the manager using partial update
        Manager partialUpdatedManager = new Manager();
        partialUpdatedManager.setId(manager.getId());

        partialUpdatedManager.lastName(UPDATED_LAST_NAME);

        restManagerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedManager.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedManager))
            )
            .andExpect(status().isOk());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeUpdate);
        Manager testManager = managerList.get(managerList.size() - 1);
        assertThat(testManager.getFullname()).isEqualTo(DEFAULT_FULLNAME);
        assertThat(testManager.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testManager.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testManager.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testManager.getMail()).isEqualTo(DEFAULT_MAIL);
    }

    @Test
    @Transactional
    void fullUpdateManagerWithPatch() throws Exception {
        // Initialize the database
        managerRepository.saveAndFlush(manager);

        int databaseSizeBeforeUpdate = managerRepository.findAll().size();

        // Update the manager using partial update
        Manager partialUpdatedManager = new Manager();
        partialUpdatedManager.setId(manager.getId());

        partialUpdatedManager
            .fullname(UPDATED_FULLNAME)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .phone(UPDATED_PHONE)
            .mail(UPDATED_MAIL);

        restManagerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedManager.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedManager))
            )
            .andExpect(status().isOk());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeUpdate);
        Manager testManager = managerList.get(managerList.size() - 1);
        assertThat(testManager.getFullname()).isEqualTo(UPDATED_FULLNAME);
        assertThat(testManager.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testManager.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testManager.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testManager.getMail()).isEqualTo(UPDATED_MAIL);
    }

    @Test
    @Transactional
    void patchNonExistingManager() throws Exception {
        int databaseSizeBeforeUpdate = managerRepository.findAll().size();
        manager.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restManagerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, manager.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(manager))
            )
            .andExpect(status().isBadRequest());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchManager() throws Exception {
        int databaseSizeBeforeUpdate = managerRepository.findAll().size();
        manager.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restManagerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(manager))
            )
            .andExpect(status().isBadRequest());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamManager() throws Exception {
        int databaseSizeBeforeUpdate = managerRepository.findAll().size();
        manager.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restManagerMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(manager)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteManager() throws Exception {
        // Initialize the database
        managerRepository.saveAndFlush(manager);

        int databaseSizeBeforeDelete = managerRepository.findAll().size();

        // Delete the manager
        restManagerMockMvc
            .perform(delete(ENTITY_API_URL_ID, manager.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
