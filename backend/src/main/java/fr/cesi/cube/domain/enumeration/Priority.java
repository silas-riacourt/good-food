package fr.cesi.cube.domain.enumeration;

/**
 * The Priority enumeration.
 */
public enum Priority {
    HIGHEST("Highest"),
    HIGHER("Higher"),
    HIGH("High"),
    NORMAL("Normal"),
    LOW("Low"),
    LOWER("Lower"),
    LOWERST("Lowest");

    private final String value;

    Priority(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
