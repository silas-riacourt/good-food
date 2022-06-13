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

    @Column(name = "open")
    private Boolean open;

    @Column(name = "location_lat")
    private Double locationLat;

    @Column(name = "location_lng")
    private Double locationLng;

    @ManyToMany(mappedBy = "restaurants")
    @JsonIgnoreProperties(value = { "items", "restaurants", "categorie" }, allowSetters = true)
    private Set<Menu> menus = new HashSet<>();

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

    public Set<Menu> getMenus() {
        return this.menus;
    }

    public void setMenus(Set<Menu> menus) {
        if (this.menus != null) {
            this.menus.forEach(i -> i.removeRestaurant(this));
        }
        if (menus != null) {
            menus.forEach(i -> i.addRestaurant(this));
        }
        this.menus = menus;
    }

    public Restaurant menus(Set<Menu> menus) {
        this.setMenus(menus);
        return this;
    }

    public Restaurant addMenu(Menu menu) {
        this.menus.add(menu);
        menu.getRestaurants().add(this);
        return this;
    }

    public Restaurant removeMenu(Menu menu) {
        this.menus.remove(menu);
        menu.getRestaurants().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", locationName='" + getLocationName() + "'" +
            ", open='" + getOpen() + "'" +
            ", locationLat=" + getLocationLat() +
            ", locationLng=" + getLocationLng() +
            "}";
    }
}
