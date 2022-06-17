package fr.cesi.goodfood.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.cesi.goodfood.IntegrationTest;
import fr.cesi.goodfood.domain.IngredientOrder;
import fr.cesi.goodfood.domain.enumeration.IngredientOrderStatus;
import fr.cesi.goodfood.repository.IngredientOrderRepository;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link IngredientOrderResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class IngredientOrderResourceIT {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final IngredientOrderStatus DEFAULT_STATUS = IngredientOrderStatus.NEW;
    private static final IngredientOrderStatus UPDATED_STATUS = IngredientOrderStatus.WAITING;

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final String ENTITY_API_URL = "/api/ingredient-orders";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private IngredientOrderRepository ingredientOrderRepository;

    @Mock
    private IngredientOrderRepository ingredientOrderRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIngredientOrderMockMvc;

    private IngredientOrder ingredientOrder;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IngredientOrder createEntity(EntityManager em) {
        IngredientOrder ingredientOrder = new IngredientOrder().date(DEFAULT_DATE).status(DEFAULT_STATUS).quantity(DEFAULT_QUANTITY);
        return ingredientOrder;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IngredientOrder createUpdatedEntity(EntityManager em) {
        IngredientOrder ingredientOrder = new IngredientOrder().date(UPDATED_DATE).status(UPDATED_STATUS).quantity(UPDATED_QUANTITY);
        return ingredientOrder;
    }

    @BeforeEach
    public void initTest() {
        ingredientOrder = createEntity(em);
    }

    @Test
    @Transactional
    void createIngredientOrder() throws Exception {
        int databaseSizeBeforeCreate = ingredientOrderRepository.findAll().size();
        // Create the IngredientOrder
        restIngredientOrderMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ingredientOrder))
            )
            .andExpect(status().isCreated());

        // Validate the IngredientOrder in the database
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeCreate + 1);
        IngredientOrder testIngredientOrder = ingredientOrderList.get(ingredientOrderList.size() - 1);
        assertThat(testIngredientOrder.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testIngredientOrder.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testIngredientOrder.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    void createIngredientOrderWithExistingId() throws Exception {
        // Create the IngredientOrder with an existing ID
        ingredientOrder.setId(1L);

        int databaseSizeBeforeCreate = ingredientOrderRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restIngredientOrderMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ingredientOrder))
            )
            .andExpect(status().isBadRequest());

        // Validate the IngredientOrder in the database
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllIngredientOrders() throws Exception {
        // Initialize the database
        ingredientOrderRepository.saveAndFlush(ingredientOrder);

        // Get all the ingredientOrderList
        restIngredientOrderMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ingredientOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllIngredientOrdersWithEagerRelationshipsIsEnabled() throws Exception {
        when(ingredientOrderRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restIngredientOrderMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(ingredientOrderRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllIngredientOrdersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(ingredientOrderRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restIngredientOrderMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(ingredientOrderRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getIngredientOrder() throws Exception {
        // Initialize the database
        ingredientOrderRepository.saveAndFlush(ingredientOrder);

        // Get the ingredientOrder
        restIngredientOrderMockMvc
            .perform(get(ENTITY_API_URL_ID, ingredientOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ingredientOrder.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    void getNonExistingIngredientOrder() throws Exception {
        // Get the ingredientOrder
        restIngredientOrderMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewIngredientOrder() throws Exception {
        // Initialize the database
        ingredientOrderRepository.saveAndFlush(ingredientOrder);

        int databaseSizeBeforeUpdate = ingredientOrderRepository.findAll().size();

        // Update the ingredientOrder
        IngredientOrder updatedIngredientOrder = ingredientOrderRepository.findById(ingredientOrder.getId()).get();
        // Disconnect from session so that the updates on updatedIngredientOrder are not directly saved in db
        em.detach(updatedIngredientOrder);
        updatedIngredientOrder.date(UPDATED_DATE).status(UPDATED_STATUS).quantity(UPDATED_QUANTITY);

        restIngredientOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedIngredientOrder.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedIngredientOrder))
            )
            .andExpect(status().isOk());

        // Validate the IngredientOrder in the database
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeUpdate);
        IngredientOrder testIngredientOrder = ingredientOrderList.get(ingredientOrderList.size() - 1);
        assertThat(testIngredientOrder.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testIngredientOrder.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testIngredientOrder.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    void putNonExistingIngredientOrder() throws Exception {
        int databaseSizeBeforeUpdate = ingredientOrderRepository.findAll().size();
        ingredientOrder.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIngredientOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ingredientOrder.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ingredientOrder))
            )
            .andExpect(status().isBadRequest());

        // Validate the IngredientOrder in the database
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchIngredientOrder() throws Exception {
        int databaseSizeBeforeUpdate = ingredientOrderRepository.findAll().size();
        ingredientOrder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIngredientOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ingredientOrder))
            )
            .andExpect(status().isBadRequest());

        // Validate the IngredientOrder in the database
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamIngredientOrder() throws Exception {
        int databaseSizeBeforeUpdate = ingredientOrderRepository.findAll().size();
        ingredientOrder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIngredientOrderMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ingredientOrder))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the IngredientOrder in the database
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateIngredientOrderWithPatch() throws Exception {
        // Initialize the database
        ingredientOrderRepository.saveAndFlush(ingredientOrder);

        int databaseSizeBeforeUpdate = ingredientOrderRepository.findAll().size();

        // Update the ingredientOrder using partial update
        IngredientOrder partialUpdatedIngredientOrder = new IngredientOrder();
        partialUpdatedIngredientOrder.setId(ingredientOrder.getId());

        partialUpdatedIngredientOrder.status(UPDATED_STATUS);

        restIngredientOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIngredientOrder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIngredientOrder))
            )
            .andExpect(status().isOk());

        // Validate the IngredientOrder in the database
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeUpdate);
        IngredientOrder testIngredientOrder = ingredientOrderList.get(ingredientOrderList.size() - 1);
        assertThat(testIngredientOrder.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testIngredientOrder.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testIngredientOrder.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    void fullUpdateIngredientOrderWithPatch() throws Exception {
        // Initialize the database
        ingredientOrderRepository.saveAndFlush(ingredientOrder);

        int databaseSizeBeforeUpdate = ingredientOrderRepository.findAll().size();

        // Update the ingredientOrder using partial update
        IngredientOrder partialUpdatedIngredientOrder = new IngredientOrder();
        partialUpdatedIngredientOrder.setId(ingredientOrder.getId());

        partialUpdatedIngredientOrder.date(UPDATED_DATE).status(UPDATED_STATUS).quantity(UPDATED_QUANTITY);

        restIngredientOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIngredientOrder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIngredientOrder))
            )
            .andExpect(status().isOk());

        // Validate the IngredientOrder in the database
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeUpdate);
        IngredientOrder testIngredientOrder = ingredientOrderList.get(ingredientOrderList.size() - 1);
        assertThat(testIngredientOrder.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testIngredientOrder.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testIngredientOrder.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    void patchNonExistingIngredientOrder() throws Exception {
        int databaseSizeBeforeUpdate = ingredientOrderRepository.findAll().size();
        ingredientOrder.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIngredientOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ingredientOrder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ingredientOrder))
            )
            .andExpect(status().isBadRequest());

        // Validate the IngredientOrder in the database
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchIngredientOrder() throws Exception {
        int databaseSizeBeforeUpdate = ingredientOrderRepository.findAll().size();
        ingredientOrder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIngredientOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ingredientOrder))
            )
            .andExpect(status().isBadRequest());

        // Validate the IngredientOrder in the database
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamIngredientOrder() throws Exception {
        int databaseSizeBeforeUpdate = ingredientOrderRepository.findAll().size();
        ingredientOrder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIngredientOrderMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ingredientOrder))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the IngredientOrder in the database
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteIngredientOrder() throws Exception {
        // Initialize the database
        ingredientOrderRepository.saveAndFlush(ingredientOrder);

        int databaseSizeBeforeDelete = ingredientOrderRepository.findAll().size();

        // Delete the ingredientOrder
        restIngredientOrderMockMvc
            .perform(delete(ENTITY_API_URL_ID, ingredientOrder.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<IngredientOrder> ingredientOrderList = ingredientOrderRepository.findAll();
        assertThat(ingredientOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
