package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.Menu;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface MenuRepositoryWithBagRelationships {
    Optional<Menu> fetchBagRelationships(Optional<Menu> menu);

    List<Menu> fetchBagRelationships(List<Menu> menus);

    Page<Menu> fetchBagRelationships(Page<Menu> menus);
}
