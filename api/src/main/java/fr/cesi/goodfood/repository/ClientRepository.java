package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.Client;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Client entity.
 */
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    default Optional<Client> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Client> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Client> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(value = "select distinct client from Client client left join fetch client.internalUser", countQuery = "select count(distinct client) from Client client")
    Page<Client> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct client from Client client left join fetch client.internalUser")
    List<Client> findAllWithToOneRelationships();

    @Query("select client from Client client left join fetch client.internalUser where client.id =:id")
    Optional<Client> findOneWithToOneRelationships(@Param("id") Long id);

    @Query("select client from Client client left join fetch client.internalUser u where u.id =:id")
    Optional<Client> findOneByUserId(@Param("id") Long id);
}
