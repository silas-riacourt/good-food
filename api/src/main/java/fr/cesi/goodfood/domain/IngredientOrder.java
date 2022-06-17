package fr.cesi.goodfood.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import fr.cesi.goodfood.domain.enumeration.IngredientOrderStatus;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;

/**
 * A IngredientOrder.
 */
@Entity
@Table(name = "ingredient_order")
public class IngredientOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "date")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private IngredientOrderStatus status;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JsonIgnoreProperties(value = { "ingredient" }, allowSetters = true)
    private Supplier supplifier;

    @ManyToOne
    @JsonIgnoreProperties(value = { "suppliers", "stocks", "products" }, allowSetters = true)
    private Ingredient ingredient;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public IngredientOrder id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public IngredientOrder date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public IngredientOrderStatus getStatus() {
        return this.status;
    }

    public IngredientOrder status(IngredientOrderStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(IngredientOrderStatus status) {
        this.status = status;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public IngredientOrder quantity(Integer quantity) {
        this.setQuantity(quantity);
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Supplier getSupplifier() {
        return this.supplifier;
    }

    public void setSupplifier(Supplier supplier) {
        this.supplifier = supplier;
    }

    public IngredientOrder supplifier(Supplier supplier) {
        this.setSupplifier(supplier);
        return this;
    }

    public Ingredient getIngredient() {
        return this.ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public IngredientOrder ingredient(Ingredient ingredient) {
        this.setIngredient(ingredient);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IngredientOrder)) {
            return false;
        }
        return id != null && id.equals(((IngredientOrder) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "IngredientOrder{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", quantity=" + getQuantity() +
            "}";
    }
}
