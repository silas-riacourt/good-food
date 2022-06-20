package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.Order;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Order entity.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    default Optional<Order> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Order> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Order> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(value = "select distinct jhiOrder from Order jhiOrder left join fetch jhiOrder.restaurant left join fetch jhiOrder.client", countQuery = "select count(distinct jhiOrder) from Order jhiOrder")
    Page<Order> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct jhiOrder from Order jhiOrder left join fetch jhiOrder.restaurant left join fetch jhiOrder.client")
    List<Order> findAllWithToOneRelationships();

    @Query("select jhiOrder from Order jhiOrder left join fetch jhiOrder.restaurant left join fetch jhiOrder.client where jhiOrder.id =:id")
    Optional<Order> findOneWithToOneRelationships(@Param("id") Long id);

    @Query("select jhiOrder from Order jhiOrder left join fetch jhiOrder.restaurant left join fetch jhiOrder.client c where c.id =:id")
    List<Order> findByClientId(@Param("id") Long id);
}
