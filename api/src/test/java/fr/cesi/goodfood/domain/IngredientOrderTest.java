package fr.cesi.goodfood.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.cesi.goodfood.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class IngredientOrderTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IngredientOrder.class);
        IngredientOrder ingredientOrder1 = new IngredientOrder();
        ingredientOrder1.setId(1L);
        IngredientOrder ingredientOrder2 = new IngredientOrder();
        ingredientOrder2.setId(ingredientOrder1.getId());
        assertThat(ingredientOrder1).isEqualTo(ingredientOrder2);
        ingredientOrder2.setId(2L);
        assertThat(ingredientOrder1).isNotEqualTo(ingredientOrder2);
        ingredientOrder1.setId(null);
        assertThat(ingredientOrder1).isNotEqualTo(ingredientOrder2);
    }
}
