package fr.cesi.goodfood.web.rest;

import fr.cesi.goodfood.domain.Categorie;
import fr.cesi.goodfood.repository.CategorieRepository;
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
 * REST controller for managing {@link fr.cesi.goodfood.domain.Categorie}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CategorieResource {

    private final Logger log = LoggerFactory.getLogger(CategorieResource.class);

    private static final String ENTITY_NAME = "categorie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CategorieRepository categorieRepository;

    public CategorieResource(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    /**
     * {@code POST  /categories} : Create a new categorie.
     *
     * @param categorie the categorie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new categorie, or with status {@code 400 (Bad Request)} if the categorie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/categories")
    public ResponseEntity<Categorie> createCategorie(@RequestBody Categorie categorie) throws URISyntaxException {
        log.debug("REST request to save Categorie : {}", categorie);
        if (categorie.getId() != null) {
            throw new BadRequestAlertException("A new categorie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Categorie result = categorieRepository.save(categorie);
        return ResponseEntity
            .created(new URI("/api/categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /categories/:id} : Updates an existing categorie.
     *
     * @param id the id of the categorie to save.
     * @param categorie the categorie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated categorie,
     * or with status {@code 400 (Bad Request)} if the categorie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the categorie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/categories/{id}")
    public ResponseEntity<Categorie> updateCategorie(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Categorie categorie
    ) throws URISyntaxException {
        log.debug("REST request to update Categorie : {}, {}", id, categorie);
        if (categorie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, categorie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!categorieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Categorie result = categorieRepository.save(categorie);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, categorie.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /categories/:id} : Partial updates given fields of an existing categorie, field will ignore if it is null
     *
     * @param id the id of the categorie to save.
     * @param categorie the categorie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated categorie,
     * or with status {@code 400 (Bad Request)} if the categorie is not valid,
     * or with status {@code 404 (Not Found)} if the categorie is not found,
     * or with status {@code 500 (Internal Server Error)} if the categorie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/categories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Categorie> partialUpdateCategorie(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Categorie categorie
    ) throws URISyntaxException {
        log.debug("REST request to partial update Categorie partially : {}, {}", id, categorie);
        if (categorie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, categorie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!categorieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Categorie> result = categorieRepository
            .findById(categorie.getId())
            .map(existingCategorie -> {
                if (categorie.getName() != null) {
                    existingCategorie.setName(categorie.getName());
                }
                if (categorie.getDescription() != null) {
                    existingCategorie.setDescription(categorie.getDescription());
                }
                if (categorie.getImage() != null) {
                    existingCategorie.setImage(categorie.getImage());
                }

                return existingCategorie;
            })
            .map(categorieRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, categorie.getId().toString())
        );
    }

    /**
     * {@code GET  /categories} : get all the categories.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of categories in body.
     */
    @GetMapping("/categories")
    public List<Categorie> getAllCategories(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Categories");
        return categorieRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /categories/:id} : get the "id" categorie.
     *
     * @param id the id of the categorie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the categorie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/categories/{id}")
    public ResponseEntity<Categorie> getCategorie(@PathVariable Long id) {
        log.debug("REST request to get Categorie : {}", id);
        Optional<Categorie> categorie = categorieRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(categorie);
    }

    /**
     * {@code DELETE  /categories/:id} : delete the "id" categorie.
     *
     * @param id the id of the categorie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategorie(@PathVariable Long id) {
        log.debug("REST request to delete Categorie : {}", id);
        categorieRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
