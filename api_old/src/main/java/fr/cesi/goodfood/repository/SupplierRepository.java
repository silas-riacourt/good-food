package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.Supplier;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Supplier entity.
 */
@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    default Optional<Supplier> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Supplier> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Supplier> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct supplier from Supplier supplier left join fetch supplier.ingredient",
        countQuery = "select count(distinct supplier) from Supplier supplier"
    )
    Page<Supplier> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct supplier from Supplier supplier left join fetch supplier.ingredient")
    List<Supplier> findAllWithToOneRelationships();

    @Query("select supplier from Supplier supplier left join fetch supplier.ingredient where supplier.id =:id")
    Optional<Supplier> findOneWithToOneRelationships(@Param("id") Long id);
}
