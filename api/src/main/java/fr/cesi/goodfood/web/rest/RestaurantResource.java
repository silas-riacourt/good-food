package fr.cesi.goodfood.web.rest;

import fr.cesi.goodfood.domain.Restaurant;
import fr.cesi.goodfood.repository.RestaurantRepository;
import fr.cesi.goodfood.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link fr.cesi.goodfood.domain.Restaurant}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RestaurantResource {

    private final Logger log = LoggerFactory.getLogger(RestaurantResource.class);

    private static final String ENTITY_NAME = "restaurant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RestaurantRepository restaurantRepository;

    public RestaurantResource(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    /**
     * {@code POST  /restaurants} : Create a new restaurant.
     *
     * @param restaurant the restaurant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new restaurant, or with status {@code 400 (Bad Request)} if
     *         the restaurant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/restaurants")
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) throws URISyntaxException {
        log.debug("REST request to save Restaurant : {}", restaurant);
        if (restaurant.getId() != null) {
            throw new BadRequestAlertException("A new restaurant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Restaurant result = restaurantRepository.save(restaurant);
        return ResponseEntity
                .created(new URI("/api/restaurants/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME,
                        result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /restaurants/:id} : Updates an existing restaurant.
     *
     * @param id         the id of the restaurant to save.
     * @param restaurant the restaurant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated restaurant,
     *         or with status {@code 400 (Bad Request)} if the restaurant is not
     *         valid,
     *         or with status {@code 500 (Internal Server Error)} if the restaurant
     *         couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/restaurants/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @PathVariable(value = "id", required = false) final Long id,
            @RequestBody Restaurant restaurant) throws URISyntaxException {
        log.debug("REST request to update Restaurant : {}, {}", id, restaurant);
        if (restaurant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, restaurant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!restaurantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Restaurant result = restaurantRepository.save(restaurant);
        return ResponseEntity
                .ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME,
                        restaurant.getId().toString()))
                .body(result);
    }

    /**
     * {@code PATCH  /restaurants/:id} : Partial updates given fields of an existing
     * restaurant, field will ignore if it is null
     *
     * @param id         the id of the restaurant to save.
     * @param restaurant the restaurant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated restaurant,
     *         or with status {@code 400 (Bad Request)} if the restaurant is not
     *         valid,
     *         or with status {@code 404 (Not Found)} if the restaurant is not
     *         found,
     *         or with status {@code 500 (Internal Server Error)} if the restaurant
     *         couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/restaurants/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Restaurant> partialUpdateRestaurant(
            @PathVariable(value = "id", required = false) final Long id,
            @RequestBody Restaurant restaurant) throws URISyntaxException {
        log.debug("REST request to partial update Restaurant partially : {}, {}", id, restaurant);
        if (restaurant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, restaurant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!restaurantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Restaurant> result = restaurantRepository
                .findById(restaurant.getId())
                .map(existingRestaurant -> {
                    if (restaurant.getName() != null) {
                        existingRestaurant.setName(restaurant.getName());
                    }
                    if (restaurant.getLocationName() != null) {
                        existingRestaurant.setLocationName(restaurant.getLocationName());
                    }
                    if (restaurant.getDescription() != null) {
                        existingRestaurant.setDescription(restaurant.getDescription());
                    }
                    if (restaurant.getSchedule() != null) {
                        existingRestaurant.setSchedule(restaurant.getSchedule());
                    }
                    if (restaurant.getOpen() != null) {
                        existingRestaurant.setOpen(restaurant.getOpen());
                    }
                    if (restaurant.getLocationLat() != null) {
                        existingRestaurant.setLocationLat(restaurant.getLocationLat());
                    }
                    if (restaurant.getLocationLng() != null) {
                        existingRestaurant.setLocationLng(restaurant.getLocationLng());
                    }

                    return existingRestaurant;
                })
                .map(restaurantRepository::save);

        return ResponseUtil.wrapOrNotFound(
                result,
                HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, restaurant.getId().toString()));
    }

    /**
     * {@code GET  /restaurants} : get all the restaurants.
     *
     * @param eagerload flag to eager load entities from relationships (This is
     *                  applicable for many-to-many).
     * @param filter    the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of restaurants in body.
     */
    @GetMapping("/restaurants")
    public List<Restaurant> getAllRestaurants(
            @RequestParam(required = false) String filter,
            @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        if ("manager-is-null".equals(filter)) {
            log.debug("REST request to get all Restaurants where manager is null");
            return StreamSupport
                    .stream(restaurantRepository.findAll().spliterator(), false)
                    .filter(restaurant -> restaurant.getManager() == null)
                    .collect(Collectors.toList());
        }

        if ("stock-is-null".equals(filter)) {
            log.debug("REST request to get all Restaurants where stock is null");
            return StreamSupport
                    .stream(restaurantRepository.findAll().spliterator(), false)
                    .filter(restaurant -> restaurant.getStock() == null)
                    .collect(Collectors.toList());
        }

        if ("order-is-null".equals(filter)) {
            log.debug("REST request to get all Restaurants where order is null");
            return StreamSupport
                    .stream(restaurantRepository.findAll().spliterator(), false)
                    .filter(restaurant -> restaurant.getOrder() == null)
                    .collect(Collectors.toList());
        }
        log.debug("REST request to get all Restaurants");
        return restaurantRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /restaurants} : get all the restaurants.
     *
     * @param id the id of the order to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of restaurants in body.
     */
    @GetMapping("/restaurants/by-manager/{id}")
    public List<Restaurant> getAllRestaurantsByManager(@PathVariable String id) {

        log.debug("REST request to get all Restaurants");

        List<Restaurant> result = new ArrayList();
        for (Restaurant restaurant : restaurantRepository.findAll()) {
            log.info(restaurant.getManager().getId().toString());
            log.info(id);
            if (restaurant.getManager() != null && restaurant.getManager().getId().toString().equals(id)) {
                result.add(restaurant);
            }
        }
        return result;
    }

    /**
     * {@code GET  /restaurants/:id} : get the "id" restaurant.
     *
     * @param id the id of the restaurant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the restaurant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/restaurants/{id}")
    public ResponseEntity<Restaurant> getRestaurant(@PathVariable Long id) {
        log.debug("REST request to get Restaurant : {}", id);
        Optional<Restaurant> restaurant = restaurantRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(restaurant);
    }

    /**
     * {@code DELETE  /restaurants/:id} : delete the "id" restaurant.
     *
     * @param id the id of the restaurant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/restaurants/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        log.debug("REST request to delete Restaurant : {}", id);
        restaurantRepository.deleteById(id);
        return ResponseEntity
                .noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
                .build();
    }
}
