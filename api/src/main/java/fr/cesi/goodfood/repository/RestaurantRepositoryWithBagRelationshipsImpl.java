package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.Restaurant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class RestaurantRepositoryWithBagRelationshipsImpl implements RestaurantRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Restaurant> fetchBagRelationships(Optional<Restaurant> restaurant) {
        return restaurant.map(this::fetchCategories);
    }

    @Override
    public Page<Restaurant> fetchBagRelationships(Page<Restaurant> restaurants) {
        return new PageImpl<>(fetchBagRelationships(restaurants.getContent()), restaurants.getPageable(), restaurants.getTotalElements());
    }

    @Override
    public List<Restaurant> fetchBagRelationships(List<Restaurant> restaurants) {
        return Optional.of(restaurants).map(this::fetchCategories).orElse(Collections.emptyList());
    }

    Restaurant fetchCategories(Restaurant result) {
        return entityManager
            .createQuery(
                "select restaurant from Restaurant restaurant left join fetch restaurant.categories where restaurant is :restaurant",
                Restaurant.class
            )
            .setParameter("restaurant", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Restaurant> fetchCategories(List<Restaurant> restaurants) {
        return entityManager
            .createQuery(
                "select distinct restaurant from Restaurant restaurant left join fetch restaurant.categories where restaurant in :restaurants",
                Restaurant.class
            )
            .setParameter("restaurants", restaurants)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
