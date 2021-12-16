package fr.cesi.cube.repository;

import fr.cesi.cube.domain.Produit;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Produit entity.
 */
@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    @Query(
        value = "select distinct produit from Produit produit left join fetch produit.ingredients",
        countQuery = "select count(distinct produit) from Produit produit"
    )
    Page<Produit> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct produit from Produit produit left join fetch produit.ingredients")
    List<Produit> findAllWithEagerRelationships();

    @Query("select produit from Produit produit left join fetch produit.ingredients where produit.id =:id")
    Optional<Produit> findOneWithEagerRelationships(@Param("id") Long id);
}
