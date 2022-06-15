package fr.cesi.goodfood.web.rest;

import fr.cesi.goodfood.domain.Ingredient;
import fr.cesi.goodfood.repository.IngredientRepository;
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
 * REST controller for managing {@link fr.cesi.goodfood.domain.Ingredient}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IngredientResource {

    private final Logger log = LoggerFactory.getLogger(IngredientResource.class);

    private static final String ENTITY_NAME = "ingredient";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IngredientRepository ingredientRepository;

    public IngredientResource(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    /**
     * {@code POST  /ingredients} : Create a new ingredient.
     *
     * @param ingredient the ingredient to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ingredient, or with status {@code 400 (Bad Request)} if the ingredient has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ingredients")
    public ResponseEntity<Ingredient> createIngredient(@RequestBody Ingredient ingredient) throws URISyntaxException {
        log.debug("REST request to save Ingredient : {}", ingredient);
        if (ingredient.getId() != null) {
            throw new BadRequestAlertException("A new ingredient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ingredient result = ingredientRepository.save(ingredient);
        return ResponseEntity
            .created(new URI("/api/ingredients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ingredients/:id} : Updates an existing ingredient.
     *
     * @param id the id of the ingredient to save.
     * @param ingredient the ingredient to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ingredient,
     * or with status {@code 400 (Bad Request)} if the ingredient is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ingredient couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ingredients/{id}")
    public ResponseEntity<Ingredient> updateIngredient(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Ingredient ingredient
    ) throws URISyntaxException {
        log.debug("REST request to update Ingredient : {}, {}", id, ingredient);
        if (ingredient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ingredient.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ingredientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Ingredient result = ingredientRepository.save(ingredient);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ingredient.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ingredients/:id} : Partial updates given fields of an existing ingredient, field will ignore if it is null
     *
     * @param id the id of the ingredient to save.
     * @param ingredient the ingredient to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ingredient,
     * or with status {@code 400 (Bad Request)} if the ingredient is not valid,
     * or with status {@code 404 (Not Found)} if the ingredient is not found,
     * or with status {@code 500 (Internal Server Error)} if the ingredient couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ingredients/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Ingredient> partialUpdateIngredient(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Ingredient ingredient
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ingredient partially : {}, {}", id, ingredient);
        if (ingredient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ingredient.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ingredientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ingredient> result = ingredientRepository
            .findById(ingredient.getId())
            .map(existingIngredient -> {
                if (ingredient.getName() != null) {
                    existingIngredient.setName(ingredient.getName());
                }
                if (ingredient.getQuantity() != null) {
                    existingIngredient.setQuantity(ingredient.getQuantity());
                }

                return existingIngredient;
            })
            .map(ingredientRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ingredient.getId().toString())
        );
    }

    /**
     * {@code GET  /ingredients} : get all the ingredients.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ingredients in body.
     */
    @GetMapping("/ingredients")
    public List<Ingredient> getAllIngredients() {
        log.debug("REST request to get all Ingredients");
        return ingredientRepository.findAll();
    }

    /**
     * {@code GET  /ingredients/:id} : get the "id" ingredient.
     *
     * @param id the id of the ingredient to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ingredient, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ingredients/{id}")
    public ResponseEntity<Ingredient> getIngredient(@PathVariable Long id) {
        log.debug("REST request to get Ingredient : {}", id);
        Optional<Ingredient> ingredient = ingredientRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ingredient);
    }

    /**
     * {@code DELETE  /ingredients/:id} : delete the "id" ingredient.
     *
     * @param id the id of the ingredient to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ingredients/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable Long id) {
        log.debug("REST request to delete Ingredient : {}", id);
        ingredientRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
