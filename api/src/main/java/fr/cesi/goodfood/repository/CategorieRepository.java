package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.Categorie;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Categorie entity.
 */
@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Long> {
    default Optional<Categorie> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Categorie> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Categorie> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct categorie from Categorie categorie left join fetch categorie.restaurant",
        countQuery = "select count(distinct categorie) from Categorie categorie"
    )
    Page<Categorie> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct categorie from Categorie categorie left join fetch categorie.restaurant")
    List<Categorie> findAllWithToOneRelationships();

    @Query("select categorie from Categorie categorie left join fetch categorie.restaurant where categorie.id =:id")
    Optional<Categorie> findOneWithToOneRelationships(@Param("id") Long id);
}
