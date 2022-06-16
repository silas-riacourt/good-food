package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.Categorie;
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
public class CategorieRepositoryWithBagRelationshipsImpl implements CategorieRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Categorie> fetchBagRelationships(Optional<Categorie> categorie) {
        return categorie.map(this::fetchProducts);
    }

    @Override
    public Page<Categorie> fetchBagRelationships(Page<Categorie> categories) {
        return new PageImpl<>(fetchBagRelationships(categories.getContent()), categories.getPageable(), categories.getTotalElements());
    }

    @Override
    public List<Categorie> fetchBagRelationships(List<Categorie> categories) {
        return Optional.of(categories).map(this::fetchProducts).orElse(Collections.emptyList());
    }

    Categorie fetchProducts(Categorie result) {
        return entityManager
            .createQuery(
                "select categorie from Categorie categorie left join fetch categorie.products where categorie is :categorie",
                Categorie.class
            )
            .setParameter("categorie", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Categorie> fetchProducts(List<Categorie> categories) {
        return entityManager
            .createQuery(
                "select distinct categorie from Categorie categorie left join fetch categorie.products where categorie in :categories",
                Categorie.class
            )
            .setParameter("categories", categories)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
