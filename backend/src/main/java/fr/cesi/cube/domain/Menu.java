package fr.cesi.cube.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Menu.
 */
@Entity
@Table(name = "menu")
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @OneToMany(mappedBy = "menu")
    @JsonIgnoreProperties(value = { "ingredients", "menu" }, allowSetters = true)
    private Set<Produit> produits = new HashSet<>();

    @ManyToMany(mappedBy = "menus")
    @JsonIgnoreProperties(value = { "menus" }, allowSetters = true)
    private Set<Restaurant> restaurants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Menu id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Menu nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<Produit> getProduits() {
        return this.produits;
    }

    public void setProduits(Set<Produit> produits) {
        if (this.produits != null) {
            this.produits.forEach(i -> i.setMenu(null));
        }
        if (produits != null) {
            produits.forEach(i -> i.setMenu(this));
        }
        this.produits = produits;
    }

    public Menu produits(Set<Produit> produits) {
        this.setProduits(produits);
        return this;
    }

    public Menu addProduit(Produit produit) {
        this.produits.add(produit);
        produit.setMenu(this);
        return this;
    }

    public Menu removeProduit(Produit produit) {
        this.produits.remove(produit);
        produit.setMenu(null);
        return this;
    }

    public Set<Restaurant> getRestaurants() {
        return this.restaurants;
    }

    public void setRestaurants(Set<Restaurant> restaurants) {
        if (this.restaurants != null) {
            this.restaurants.forEach(i -> i.removeMenu(this));
        }
        if (restaurants != null) {
            restaurants.forEach(i -> i.addMenu(this));
        }
        this.restaurants = restaurants;
    }

    public Menu restaurants(Set<Restaurant> restaurants) {
        this.setRestaurants(restaurants);
        return this;
    }

    public Menu addRestaurant(Restaurant restaurant) {
        this.restaurants.add(restaurant);
        restaurant.getMenus().add(this);
        return this;
    }

    public Menu removeRestaurant(Restaurant restaurant) {
        this.restaurants.remove(restaurant);
        restaurant.getMenus().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Menu)) {
            return false;
        }
        return id != null && id.equals(((Menu) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Menu{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
