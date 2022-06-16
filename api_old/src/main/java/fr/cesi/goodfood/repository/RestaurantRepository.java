package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.Restaurant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Restaurant entity.
 */
@Repository
public interface RestaurantRepository extends RestaurantRepositoryWithBagRelationships, JpaRepository<Restaurant, Long> {
    default Optional<Restaurant> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<Restaurant> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Restaurant> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
