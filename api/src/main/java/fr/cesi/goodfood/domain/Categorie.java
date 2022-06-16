package fr.cesi.goodfood.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Categorie.
 */
@Entity
@Table(name = "categorie")
public class Categorie implements Serializable {

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

    @Column(name = "image")
    private String image;

    @ManyToMany
    @JoinTable(
        name = "rel_categorie__product",
        joinColumns = @JoinColumn(name = "categorie_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @JsonIgnoreProperties(value = { "ingredients", "categories" }, allowSetters = true)
    private Set<Product> products = new HashSet<>();

    @ManyToMany(mappedBy = "categories")
    @JsonIgnoreProperties(value = { "categories", "manager", "stock", "order" }, allowSetters = true)
    private Set<Restaurant> restaurants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Categorie id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Categorie name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Categorie description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return this.image;
    }

    public Categorie image(String image) {
        this.setImage(image);
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Set<Product> getProducts() {
        return this.products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Categorie products(Set<Product> products) {
        this.setProducts(products);
        return this;
    }

    public Categorie addProduct(Product product) {
        this.products.add(product);
        product.getCategories().add(this);
        return this;
    }

    public Categorie removeProduct(Product product) {
        this.products.remove(product);
        product.getCategories().remove(this);
        return this;
    }

    public Set<Restaurant> getRestaurants() {
        return this.restaurants;
    }

    public void setRestaurants(Set<Restaurant> restaurants) {
        if (this.restaurants != null) {
            this.restaurants.forEach(i -> i.removeCategorie(this));
        }
        if (restaurants != null) {
            restaurants.forEach(i -> i.addCategorie(this));
        }
        this.restaurants = restaurants;
    }

    public Categorie restaurants(Set<Restaurant> restaurants) {
        this.setRestaurants(restaurants);
        return this;
    }

    public Categorie addRestaurant(Restaurant restaurant) {
        this.restaurants.add(restaurant);
        restaurant.getCategories().add(this);
        return this;
    }

    public Categorie removeRestaurant(Restaurant restaurant) {
        this.restaurants.remove(restaurant);
        restaurant.getCategories().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Categorie)) {
            return false;
        }
        return id != null && id.equals(((Categorie) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Categorie{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", image='" + getImage() + "'" +
            "}";
    }
}
