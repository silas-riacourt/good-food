package fr.cesi.goodfood.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.cesi.goodfood.IntegrationTest;
import fr.cesi.goodfood.domain.Restaurant;
import fr.cesi.goodfood.repository.RestaurantRepository;
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
 * Integration tests for the {@link RestaurantResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class RestaurantResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_SCHEDULE = "AAAAAAAAAA";
    private static final String UPDATED_SCHEDULE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_OPEN = false;
    private static final Boolean UPDATED_OPEN = true;

    private static final Double DEFAULT_LOCATION_LAT = 1D;
    private static final Double UPDATED_LOCATION_LAT = 2D;

    private static final Double DEFAULT_LOCATION_LNG = 1D;
    private static final Double UPDATED_LOCATION_LNG = 2D;

    private static final String ENTITY_API_URL = "/api/restaurants";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Mock
    private RestaurantRepository restaurantRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRestaurantMockMvc;

    private Restaurant restaurant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Restaurant createEntity(EntityManager em) {
        Restaurant restaurant = new Restaurant()
            .name(DEFAULT_NAME)
            .locationName(DEFAULT_LOCATION_NAME)
            .description(DEFAULT_DESCRIPTION)
            .schedule(DEFAULT_SCHEDULE)
            .open(DEFAULT_OPEN)
            .locationLat(DEFAULT_LOCATION_LAT)
            .locationLng(DEFAULT_LOCATION_LNG);
        return restaurant;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Restaurant createUpdatedEntity(EntityManager em) {
        Restaurant restaurant = new Restaurant()
            .name(UPDATED_NAME)
            .locationName(UPDATED_LOCATION_NAME)
            .description(UPDATED_DESCRIPTION)
            .schedule(UPDATED_SCHEDULE)
            .open(UPDATED_OPEN)
            .locationLat(UPDATED_LOCATION_LAT)
            .locationLng(UPDATED_LOCATION_LNG);
        return restaurant;
    }

    @BeforeEach
    public void initTest() {
        restaurant = createEntity(em);
    }

    @Test
    @Transactional
    void createRestaurant() throws Exception {
        int databaseSizeBeforeCreate = restaurantRepository.findAll().size();
        // Create the Restaurant
        restRestaurantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(restaurant)))
            .andExpect(status().isCreated());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeCreate + 1);
        Restaurant testRestaurant = restaurantList.get(restaurantList.size() - 1);
        assertThat(testRestaurant.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRestaurant.getLocationName()).isEqualTo(DEFAULT_LOCATION_NAME);
        assertThat(testRestaurant.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRestaurant.getSchedule()).isEqualTo(DEFAULT_SCHEDULE);
        assertThat(testRestaurant.getOpen()).isEqualTo(DEFAULT_OPEN);
        assertThat(testRestaurant.getLocationLat()).isEqualTo(DEFAULT_LOCATION_LAT);
        assertThat(testRestaurant.getLocationLng()).isEqualTo(DEFAULT_LOCATION_LNG);
    }

    @Test
    @Transactional
    void createRestaurantWithExistingId() throws Exception {
        // Create the Restaurant with an existing ID
        restaurant.setId(1L);

        int databaseSizeBeforeCreate = restaurantRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestaurantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(restaurant)))
            .andExpect(status().isBadRequest());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRestaurants() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList
        restRestaurantMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restaurant.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].locationName").value(hasItem(DEFAULT_LOCATION_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].schedule").value(hasItem(DEFAULT_SCHEDULE)))
            .andExpect(jsonPath("$.[*].open").value(hasItem(DEFAULT_OPEN.booleanValue())))
            .andExpect(jsonPath("$.[*].locationLat").value(hasItem(DEFAULT_LOCATION_LAT.doubleValue())))
            .andExpect(jsonPath("$.[*].locationLng").value(hasItem(DEFAULT_LOCATION_LNG.doubleValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllRestaurantsWithEagerRelationshipsIsEnabled() throws Exception {
        when(restaurantRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restRestaurantMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(restaurantRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllRestaurantsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(restaurantRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restRestaurantMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(restaurantRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getRestaurant() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get the restaurant
        restRestaurantMockMvc
            .perform(get(ENTITY_API_URL_ID, restaurant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(restaurant.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.locationName").value(DEFAULT_LOCATION_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.schedule").value(DEFAULT_SCHEDULE))
            .andExpect(jsonPath("$.open").value(DEFAULT_OPEN.booleanValue()))
            .andExpect(jsonPath("$.locationLat").value(DEFAULT_LOCATION_LAT.doubleValue()))
            .andExpect(jsonPath("$.locationLng").value(DEFAULT_LOCATION_LNG.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingRestaurant() throws Exception {
        // Get the restaurant
        restRestaurantMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewRestaurant() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();

        // Update the restaurant
        Restaurant updatedRestaurant = restaurantRepository.findById(restaurant.getId()).get();
        // Disconnect from session so that the updates on updatedRestaurant are not directly saved in db
        em.detach(updatedRestaurant);
        updatedRestaurant
            .name(UPDATED_NAME)
            .locationName(UPDATED_LOCATION_NAME)
            .description(UPDATED_DESCRIPTION)
            .schedule(UPDATED_SCHEDULE)
            .open(UPDATED_OPEN)
            .locationLat(UPDATED_LOCATION_LAT)
            .locationLng(UPDATED_LOCATION_LNG);

        restRestaurantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRestaurant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRestaurant))
            )
            .andExpect(status().isOk());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
        Restaurant testRestaurant = restaurantList.get(restaurantList.size() - 1);
        assertThat(testRestaurant.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRestaurant.getLocationName()).isEqualTo(UPDATED_LOCATION_NAME);
        assertThat(testRestaurant.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRestaurant.getSchedule()).isEqualTo(UPDATED_SCHEDULE);
        assertThat(testRestaurant.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testRestaurant.getLocationLat()).isEqualTo(UPDATED_LOCATION_LAT);
        assertThat(testRestaurant.getLocationLng()).isEqualTo(UPDATED_LOCATION_LNG);
    }

    @Test
    @Transactional
    void putNonExistingRestaurant() throws Exception {
        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();
        restaurant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRestaurantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, restaurant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(restaurant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRestaurant() throws Exception {
        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();
        restaurant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRestaurantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(restaurant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRestaurant() throws Exception {
        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();
        restaurant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRestaurantMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(restaurant)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRestaurantWithPatch() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();

        // Update the restaurant using partial update
        Restaurant partialUpdatedRestaurant = new Restaurant();
        partialUpdatedRestaurant.setId(restaurant.getId());

        partialUpdatedRestaurant.locationLat(UPDATED_LOCATION_LAT).locationLng(UPDATED_LOCATION_LNG);

        restRestaurantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRestaurant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRestaurant))
            )
            .andExpect(status().isOk());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
        Restaurant testRestaurant = restaurantList.get(restaurantList.size() - 1);
        assertThat(testRestaurant.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRestaurant.getLocationName()).isEqualTo(DEFAULT_LOCATION_NAME);
        assertThat(testRestaurant.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRestaurant.getSchedule()).isEqualTo(DEFAULT_SCHEDULE);
        assertThat(testRestaurant.getOpen()).isEqualTo(DEFAULT_OPEN);
        assertThat(testRestaurant.getLocationLat()).isEqualTo(UPDATED_LOCATION_LAT);
        assertThat(testRestaurant.getLocationLng()).isEqualTo(UPDATED_LOCATION_LNG);
    }

    @Test
    @Transactional
    void fullUpdateRestaurantWithPatch() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();

        // Update the restaurant using partial update
        Restaurant partialUpdatedRestaurant = new Restaurant();
        partialUpdatedRestaurant.setId(restaurant.getId());

        partialUpdatedRestaurant
            .name(UPDATED_NAME)
            .locationName(UPDATED_LOCATION_NAME)
            .description(UPDATED_DESCRIPTION)
            .schedule(UPDATED_SCHEDULE)
            .open(UPDATED_OPEN)
            .locationLat(UPDATED_LOCATION_LAT)
            .locationLng(UPDATED_LOCATION_LNG);

        restRestaurantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRestaurant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRestaurant))
            )
            .andExpect(status().isOk());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
        Restaurant testRestaurant = restaurantList.get(restaurantList.size() - 1);
        assertThat(testRestaurant.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRestaurant.getLocationName()).isEqualTo(UPDATED_LOCATION_NAME);
        assertThat(testRestaurant.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRestaurant.getSchedule()).isEqualTo(UPDATED_SCHEDULE);
        assertThat(testRestaurant.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testRestaurant.getLocationLat()).isEqualTo(UPDATED_LOCATION_LAT);
        assertThat(testRestaurant.getLocationLng()).isEqualTo(UPDATED_LOCATION_LNG);
    }

    @Test
    @Transactional
    void patchNonExistingRestaurant() throws Exception {
        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();
        restaurant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRestaurantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, restaurant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(restaurant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRestaurant() throws Exception {
        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();
        restaurant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRestaurantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(restaurant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRestaurant() throws Exception {
        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();
        restaurant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRestaurantMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(restaurant))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRestaurant() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        int databaseSizeBeforeDelete = restaurantRepository.findAll().size();

        // Delete the restaurant
        restRestaurantMockMvc
            .perform(delete(ENTITY_API_URL_ID, restaurant.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
