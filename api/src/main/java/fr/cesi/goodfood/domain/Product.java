package fr.cesi.goodfood.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "image")
    private String image;

    @Column(name = "tva")
    private Double tva;

    @Column(name = "tva_take_away")
    private Double tvaTakeAway;

    @ManyToMany
    @JoinTable(
        name = "rel_product__ingredient",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    @JsonIgnoreProperties(value = { "suppliers", "stocks", "products" }, allowSetters = true)
    private Set<Ingredient> ingredients = new HashSet<>();

    @ManyToMany(mappedBy = "products")
    @JsonIgnoreProperties(value = { "products", "restaurants" }, allowSetters = true)
    private Set<Categorie> categories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Product id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Product name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Product description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return this.price;
    }

    public Product price(Double price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return this.image;
    }

    public Product image(String image) {
        this.setImage(image);
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getTva() {
        return this.tva;
    }

    public Product tva(Double tva) {
        this.setTva(tva);
        return this;
    }

    public void setTva(Double tva) {
        this.tva = tva;
    }

    public Double getTvaTakeAway() {
        return this.tvaTakeAway;
    }

    public Product tvaTakeAway(Double tvaTakeAway) {
        this.setTvaTakeAway(tvaTakeAway);
        return this;
    }

    public void setTvaTakeAway(Double tvaTakeAway) {
        this.tvaTakeAway = tvaTakeAway;
    }

    public Set<Ingredient> getIngredients() {
        return this.ingredients;
    }

    public void setIngredients(Set<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Product ingredients(Set<Ingredient> ingredients) {
        this.setIngredients(ingredients);
        return this;
    }

    public Product addIngredient(Ingredient ingredient) {
        this.ingredients.add(ingredient);
        ingredient.getProducts().add(this);
        return this;
    }

    public Product removeIngredient(Ingredient ingredient) {
        this.ingredients.remove(ingredient);
        ingredient.getProducts().remove(this);
        return this;
    }

    public Set<Categorie> getCategories() {
        return this.categories;
    }

    public void setCategories(Set<Categorie> categories) {
        if (this.categories != null) {
            this.categories.forEach(i -> i.removeProduct(this));
        }
        if (categories != null) {
            categories.forEach(i -> i.addProduct(this));
        }
        this.categories = categories;
    }

    public Product categories(Set<Categorie> categories) {
        this.setCategories(categories);
        return this;
    }

    public Product addCategorie(Categorie categorie) {
        this.categories.add(categorie);
        categorie.getProducts().add(this);
        return this;
    }

    public Product removeCategorie(Categorie categorie) {
        this.categories.remove(categorie);
        categorie.getProducts().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            ", image='" + getImage() + "'" +
            ", tva=" + getTva() +
            ", tvaTakeAway=" + getTvaTakeAway() +
            "}";
    }
}
