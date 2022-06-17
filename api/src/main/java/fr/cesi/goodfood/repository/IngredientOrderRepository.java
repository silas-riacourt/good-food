package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.IngredientOrder;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the IngredientOrder entity.
 */
@Repository
public interface IngredientOrderRepository extends JpaRepository<IngredientOrder, Long> {
    default Optional<IngredientOrder> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<IngredientOrder> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<IngredientOrder> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct ingredientOrder from IngredientOrder ingredientOrder left join fetch ingredientOrder.supplifier left join fetch ingredientOrder.ingredient",
        countQuery = "select count(distinct ingredientOrder) from IngredientOrder ingredientOrder"
    )
    Page<IngredientOrder> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct ingredientOrder from IngredientOrder ingredientOrder left join fetch ingredientOrder.supplifier left join fetch ingredientOrder.ingredient"
    )
    List<IngredientOrder> findAllWithToOneRelationships();

    @Query(
        "select ingredientOrder from IngredientOrder ingredientOrder left join fetch ingredientOrder.supplifier left join fetch ingredientOrder.ingredient where ingredientOrder.id =:id"
    )
    Optional<IngredientOrder> findOneWithToOneRelationships(@Param("id") Long id);
}
