package fr.cesi.goodfood.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.cesi.goodfood.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ManagerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Manager.class);
        Manager manager1 = new Manager();
        manager1.setId(1L);
        Manager manager2 = new Manager();
        manager2.setId(manager1.getId());
        assertThat(manager1).isEqualTo(manager2);
        manager2.setId(2L);
        assertThat(manager1).isNotEqualTo(manager2);
        manager1.setId(null);
        assertThat(manager1).isNotEqualTo(manager2);
    }
}
