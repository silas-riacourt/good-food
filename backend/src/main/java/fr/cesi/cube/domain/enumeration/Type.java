package fr.cesi.cube.domain.enumeration;

/**
 * The Type enumeration.
 */
public enum Type {
    BUG("Bug"),
    FEATURE("Feature");

    private final String value;

    Type(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
