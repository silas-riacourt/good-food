package fr.cesi.goodfood.web.rest;

import fr.cesi.goodfood.domain.IngredientOrder;
import fr.cesi.goodfood.repository.IngredientOrderRepository;
import fr.cesi.goodfood.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link fr.cesi.goodfood.domain.IngredientOrder}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IngredientOrderResource {

    private final Logger log = LoggerFactory.getLogger(IngredientOrderResource.class);

    private static final String ENTITY_NAME = "ingredientOrder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IngredientOrderRepository ingredientOrderRepository;

    public IngredientOrderResource(IngredientOrderRepository ingredientOrderRepository) {
        this.ingredientOrderRepository = ingredientOrderRepository;
    }

    /**
     * {@code POST  /ingredient-orders} : Create a new ingredientOrder.
     *
     * @param ingredientOrder the ingredientOrder to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ingredientOrder, or with status {@code 400 (Bad Request)} if the ingredientOrder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ingredient-orders")
    public ResponseEntity<IngredientOrder> createIngredientOrder(@RequestBody IngredientOrder ingredientOrder) throws URISyntaxException {
        log.debug("REST request to save IngredientOrder : {}", ingredientOrder);
        if (ingredientOrder.getId() != null) {
            throw new BadRequestAlertException("A new ingredientOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IngredientOrder result = ingredientOrderRepository.save(ingredientOrder);
        return ResponseEntity
            .created(new URI("/api/ingredient-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ingredient-orders/:id} : Updates an existing ingredientOrder.
     *
     * @param id the id of the ingredientOrder to save.
     * @param ingredientOrder the ingredientOrder to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ingredientOrder,
     * or with status {@code 400 (Bad Request)} if the ingredientOrder is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ingredientOrder couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ingredient-orders/{id}")
    public ResponseEntity<IngredientOrder> updateIngredientOrder(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody IngredientOrder ingredientOrder
    ) throws URISyntaxException {
        log.debug("REST request to update IngredientOrder : {}, {}", id, ingredientOrder);
        if (ingredientOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ingredientOrder.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ingredientOrderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        IngredientOrder result = ingredientOrderRepository.save(ingredientOrder);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ingredientOrder.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ingredient-orders/:id} : Partial updates given fields of an existing ingredientOrder, field will ignore if it is null
     *
     * @param id the id of the ingredientOrder to save.
     * @param ingredientOrder the ingredientOrder to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ingredientOrder,
     * or with status {@code 400 (Bad Request)} if the ingredientOrder is not valid,
     * or with status {@code 404 (Not Found)} if the ingredientOrder is not found,
     * or with status {@code 500 (Internal Server Error)} if the ingredientOrder couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ingredient-orders/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<IngredientOrder> partialUpdateIngredientOrder(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody IngredientOrder ingredientOrder
    ) throws URISyntaxException {
        log.debug("REST request to partial update IngredientOrder partially : {}, {}", id, ingredientOrder);
        if (ingredientOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ingredientOrder.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ingredientOrderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<IngredientOrder> result = ingredientOrderRepository
            .findById(ingredientOrder.getId())
            .map(existingIngredientOrder -> {
                if (ingredientOrder.getDate() != null) {
                    existingIngredientOrder.setDate(ingredientOrder.getDate());
                }
                if (ingredientOrder.getStatus() != null) {
                    existingIngredientOrder.setStatus(ingredientOrder.getStatus());
                }
                if (ingredientOrder.getQuantity() != null) {
                    existingIngredientOrder.setQuantity(ingredientOrder.getQuantity());
                }

                return existingIngredientOrder;
            })
            .map(ingredientOrderRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ingredientOrder.getId().toString())
        );
    }

    /**
     * {@code GET  /ingredient-orders} : get all the ingredientOrders.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ingredientOrders in body.
     */
    @GetMapping("/ingredient-orders")
    public List<IngredientOrder> getAllIngredientOrders(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all IngredientOrders");
        return ingredientOrderRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /ingredient-orders/:id} : get the "id" ingredientOrder.
     *
     * @param id the id of the ingredientOrder to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ingredientOrder, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ingredient-orders/{id}")
    public ResponseEntity<IngredientOrder> getIngredientOrder(@PathVariable Long id) {
        log.debug("REST request to get IngredientOrder : {}", id);
        Optional<IngredientOrder> ingredientOrder = ingredientOrderRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(ingredientOrder);
    }

    /**
     * {@code DELETE  /ingredient-orders/:id} : delete the "id" ingredientOrder.
     *
     * @param id the id of the ingredientOrder to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ingredient-orders/{id}")
    public ResponseEntity<Void> deleteIngredientOrder(@PathVariable Long id) {
        log.debug("REST request to delete IngredientOrder : {}", id);
        ingredientOrderRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
