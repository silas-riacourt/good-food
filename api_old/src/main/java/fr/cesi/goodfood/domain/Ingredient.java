package fr.cesi.goodfood.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Ingredient.
 */
@Entity
@Table(name = "ingredient")
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private Integer quantity;

    @OneToMany(mappedBy = "ingredient")
    @JsonIgnoreProperties(value = { "ingredient" }, allowSetters = true)
    private Set<Supplier> suppliers = new HashSet<>();

    @OneToMany(mappedBy = "ingredient")
    @JsonIgnoreProperties(value = { "restaurant", "ingredient" }, allowSetters = true)
    private Set<Stock> stocks = new HashSet<>();

    @ManyToMany(mappedBy = "ingredients")
    @JsonIgnoreProperties(value = { "ingredients", "categories" }, allowSetters = true)
    private Set<Product> products = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ingredient id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Ingredient name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public Ingredient quantity(Integer quantity) {
        this.setQuantity(quantity);
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Set<Supplier> getSuppliers() {
        return this.suppliers;
    }

    public void setSuppliers(Set<Supplier> suppliers) {
        if (this.suppliers != null) {
            this.suppliers.forEach(i -> i.setIngredient(null));
        }
        if (suppliers != null) {
            suppliers.forEach(i -> i.setIngredient(this));
        }
        this.suppliers = suppliers;
    }

    public Ingredient suppliers(Set<Supplier> suppliers) {
        this.setSuppliers(suppliers);
        return this;
    }

    public Ingredient addSupplier(Supplier supplier) {
        this.suppliers.add(supplier);
        supplier.setIngredient(this);
        return this;
    }

    public Ingredient removeSupplier(Supplier supplier) {
        this.suppliers.remove(supplier);
        supplier.setIngredient(null);
        return this;
    }

    public Set<Stock> getStocks() {
        return this.stocks;
    }

    public void setStocks(Set<Stock> stocks) {
        if (this.stocks != null) {
            this.stocks.forEach(i -> i.setIngredient(null));
        }
        if (stocks != null) {
            stocks.forEach(i -> i.setIngredient(this));
        }
        this.stocks = stocks;
    }

    public Ingredient stocks(Set<Stock> stocks) {
        this.setStocks(stocks);
        return this;
    }

    public Ingredient addStock(Stock stock) {
        this.stocks.add(stock);
        stock.setIngredient(this);
        return this;
    }

    public Ingredient removeStock(Stock stock) {
        this.stocks.remove(stock);
        stock.setIngredient(null);
        return this;
    }

    public Set<Product> getProducts() {
        return this.products;
    }

    public void setProducts(Set<Product> products) {
        if (this.products != null) {
            this.products.forEach(i -> i.removeIngredient(this));
        }
        if (products != null) {
            products.forEach(i -> i.addIngredient(this));
        }
        this.products = products;
    }

    public Ingredient products(Set<Product> products) {
        this.setProducts(products);
        return this;
    }

    public Ingredient addProduct(Product product) {
        this.products.add(product);
        product.getIngredients().add(this);
        return this;
    }

    public Ingredient removeProduct(Product product) {
        this.products.remove(product);
        product.getIngredients().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ingredient)) {
            return false;
        }
        return id != null && id.equals(((Ingredient) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ingredient{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", quantity=" + getQuantity() +
            "}";
    }
}
