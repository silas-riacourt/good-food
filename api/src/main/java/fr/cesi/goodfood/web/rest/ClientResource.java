package fr.cesi.goodfood.web.rest;

import fr.cesi.goodfood.domain.Client;
import fr.cesi.goodfood.repository.ClientRepository;
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
 * REST controller for managing {@link fr.cesi.goodfood.domain.Client}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClientResource {

    private final Logger log = LoggerFactory.getLogger(ClientResource.class);

    private static final String ENTITY_NAME = "client";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClientRepository clientRepository;

    public ClientResource(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    /**
     * {@code POST  /clients} : Create a new client.
     *
     * @param client the client to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new client, or with status {@code 400 (Bad Request)} if the
     *         client has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/clients")
    public ResponseEntity<Client> createClient(@RequestBody Client client) throws URISyntaxException {
        log.debug("REST request to save Client : {}", client);
        if (client.getId() != null) {
            throw new BadRequestAlertException("A new client cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Client result = clientRepository.save(client);
        return ResponseEntity
                .created(new URI("/api/clients/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME,
                        result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /clients/:id} : Updates an existing client.
     *
     * @param id     the id of the client to save.
     * @param client the client to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated client,
     *         or with status {@code 400 (Bad Request)} if the client is not valid,
     *         or with status {@code 500 (Internal Server Error)} if the client
     *         couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clients/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable(value = "id", required = false) final Long id,
            @RequestBody Client client)
            throws URISyntaxException {
        log.debug("REST request to update Client : {}, {}", id, client);
        if (client.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, client.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Client result = clientRepository.save(client);
        return ResponseEntity
                .ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME,
                        client.getId().toString()))
                .body(result);
    }

    /**
     * {@code PATCH  /clients/:id} : Partial updates given fields of an existing
     * client, field will ignore if it is null
     *
     * @param id     the id of the client to save.
     * @param client the client to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated client,
     *         or with status {@code 400 (Bad Request)} if the client is not valid,
     *         or with status {@code 404 (Not Found)} if the client is not found,
     *         or with status {@code 500 (Internal Server Error)} if the client
     *         couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/clients/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Client> partialUpdateClient(
            @PathVariable(value = "id", required = false) final Long id,
            @RequestBody Client client) throws URISyntaxException {
        log.debug("REST request to partial update Client partially : {}, {}", id, client);
        if (client.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, client.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Client> result = clientRepository
                .findById(client.getId())
                .map(existingClient -> {
                    if (client.getFullname() != null) {
                        existingClient.setFullname(client.getFullname());
                    }
                    if (client.getFirstName() != null) {
                        existingClient.setFirstName(client.getFirstName());
                    }
                    if (client.getLastName() != null) {
                        existingClient.setLastName(client.getLastName());
                    }
                    if (client.getPhone() != null) {
                        existingClient.setPhone(client.getPhone());
                    }
                    if (client.getMail() != null) {
                        existingClient.setMail(client.getMail());
                    }

                    return existingClient;
                })
                .map(clientRepository::save);

        return ResponseUtil.wrapOrNotFound(
                result,
                HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, client.getId().toString()));
    }

    /**
     * {@code GET  /clients} : get all the clients.
     *
     * @param eagerload flag to eager load entities from relationships (This is
     *                  applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of clients in body.
     */
    @GetMapping("/clients")
    public List<Client> getAllClients(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Clients");
        return clientRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /clients/:id} : get the "id" client.
     *
     * @param id the id of the client to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the client, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> getClient(@PathVariable Long id) {
        log.debug("REST request to get Client : {}", id);
        Optional<Client> client = clientRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(client);
    }

    /**
     * {@code GET  /clients/:id} : get the "id" client.
     *
     * @param id the id of the client to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the client, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clients/by-user-id/{id}")
    public ResponseEntity<Client> getClientByUserId(@PathVariable Long id) {
        log.debug("REST request to get Client by user id : {}", id);
        Optional<Client> client = clientRepository.findOneByUserId(id);
        return ResponseUtil.wrapOrNotFound(client);
    }

    /**
     * {@code DELETE  /clients/:id} : delete the "id" client.
     *
     * @param id the id of the client to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/clients/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        log.debug("REST request to delete Client : {}", id);
        clientRepository.deleteById(id);
        return ResponseEntity
                .noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
                .build();
    }
}
