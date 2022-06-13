package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.Menu;
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
public class MenuRepositoryWithBagRelationshipsImpl implements MenuRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Menu> fetchBagRelationships(Optional<Menu> menu) {
        return menu.map(this::fetchRestaurants);
    }

    @Override
    public Page<Menu> fetchBagRelationships(Page<Menu> menus) {
        return new PageImpl<>(fetchBagRelationships(menus.getContent()), menus.getPageable(), menus.getTotalElements());
    }

    @Override
    public List<Menu> fetchBagRelationships(List<Menu> menus) {
        return Optional.of(menus).map(this::fetchRestaurants).orElse(Collections.emptyList());
    }

    Menu fetchRestaurants(Menu result) {
        return entityManager
            .createQuery("select menu from Menu menu left join fetch menu.restaurants where menu is :menu", Menu.class)
            .setParameter("menu", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Menu> fetchRestaurants(List<Menu> menus) {
        return entityManager
            .createQuery("select distinct menu from Menu menu left join fetch menu.restaurants where menu in :menus", Menu.class)
            .setParameter("menus", menus)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
