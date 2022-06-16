package fr.cesi.goodfood.repository;

import fr.cesi.goodfood.domain.Categorie;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface CategorieRepositoryWithBagRelationships {
    Optional<Categorie> fetchBagRelationships(Optional<Categorie> categorie);

    List<Categorie> fetchBagRelationships(List<Categorie> categories);

    Page<Categorie> fetchBagRelationships(Page<Categorie> categories);
}
