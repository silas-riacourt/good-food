package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.Restaurant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface RestaurantRepositoryWithBagRelationships {
    Optional<Restaurant> fetchBagRelationships(Optional<Restaurant> restaurant);

    List<Restaurant> fetchBagRelationships(List<Restaurant> restaurants);

    Page<Restaurant> fetchBagRelationships(Page<Restaurant> restaurants);
}
