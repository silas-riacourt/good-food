package fr.cesi.goodfood.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Restaurant.
 */
@Entity
@Table(name = "restaurant")
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "description")
    private String description;

    @Column(name = "schedule")
    private String schedule;

    @Column(name = "open")
    private Boolean open;

    @Column(name = "location_lat")
    private Double locationLat;

    @Column(name = "location_lng")
    private Double locationLng;

    @ManyToMany
    @JoinTable(name = "rel_restaurant__categorie", joinColumns = @JoinColumn(name = "restaurant_id"), inverseJoinColumns = @JoinColumn(name = "categorie_id"))
    @JsonIgnoreProperties(value = { "products", "restaurants" }, allowSetters = true)
    private Set<Categorie> categories = new HashSet<>();

    @JsonIgnoreProperties(value = { "restaurant" }, allowSetters = true)
    @OneToOne(mappedBy = "restaurant")
    private Manager manager;

    @JsonIgnoreProperties(value = { "restaurant", "ingredient" }, allowSetters = true)
    @OneToMany(mappedBy = "restaurant")
    private Set<Stock> stock;

    @JsonIgnoreProperties(value = { "restaurant", "productOrders", "client" }, allowSetters = true)
    @OneToMany(mappedBy = "restaurant")
    private Set<Order> order;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Restaurant id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Restaurant name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocationName() {
        return this.locationName;
    }

    public Restaurant locationName(String locationName) {
        this.setLocationName(locationName);
        return this;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getDescription() {
        return this.description;
    }

    public Restaurant description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSchedule() {
        return this.schedule;
    }

    public Restaurant schedule(String schedule) {
        this.setSchedule(schedule);
        return this;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public Boolean getOpen() {
        return this.open;
    }

    public Restaurant open(Boolean open) {
        this.setOpen(open);
        return this;
    }

    public void setOpen(Boolean open) {
        this.open = open;
    }

    public Double getLocationLat() {
        return this.locationLat;
    }

    public Restaurant locationLat(Double locationLat) {
        this.setLocationLat(locationLat);
        return this;
    }

    public void setLocationLat(Double locationLat) {
        this.locationLat = locationLat;
    }

    public Double getLocationLng() {
        return this.locationLng;
    }

    public Restaurant locationLng(Double locationLng) {
        this.setLocationLng(locationLng);
        return this;
    }

    public void setLocationLng(Double locationLng) {
        this.locationLng = locationLng;
    }

    public Set<Categorie> getCategories() {
        return this.categories;
    }

    public void setCategories(Set<Categorie> categories) {
        this.categories = categories;
    }

    public Restaurant categories(Set<Categorie> categories) {
        this.setCategories(categories);
        return this;
    }

    public Restaurant addCategorie(Categorie categorie) {
        this.categories.add(categorie);
        categorie.getRestaurants().add(this);
        return this;
    }

    public Restaurant removeCategorie(Categorie categorie) {
        this.categories.remove(categorie);
        categorie.getRestaurants().remove(this);
        return this;
    }

    public Manager getManager() {
        return this.manager;
    }

    public void setManager(Manager manager) {
        if (this.manager != null) {
            this.manager.setRestaurant(null);
        }
        if (manager != null) {
            manager.setRestaurant(this);
        }
        this.manager = manager;
    }

    public Restaurant manager(Manager manager) {
        this.setManager(manager);
        return this;
    }

    public Set<Stock> getStock() {
        return this.stock;
    }

    /*
     * public void setStock(Stock stock) {
     * if (this.stock != null) {
     * this.stock.setRestaurant(null);
     * }
     * if (stock != null) {
     * stock.setRestaurant(this);
     * }
     * this.stock = stock;
     * }
     */

    /*
     * public Restaurant stock(Set<Stock> stock) {
     * this.setStock(stock);
     * return this;
     * }
     */

    public Set<Order> getOrder() {
        return this.order;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Restaurant)) {
            return false;
        }
        return id != null && id.equals(((Restaurant) o).id);
    }

    @Override
    public int hashCode() {
        // see
        // https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Restaurant{" +
                "id=" + getId() +
                ", name='" + getName() + "'" +
                ", locationName='" + getLocationName() + "'" +
                ", description='" + getDescription() + "'" +
                ", schedule='" + getSchedule() + "'" +
                ", open='" + getOpen() + "'" +
                ", locationLat=" + getLocationLat() +
                ", locationLng=" + getLocationLng() +
                "}";
    }
}
