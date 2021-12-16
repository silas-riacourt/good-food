package fr.cesi.cube.domain.enumeration;

/**
 * The Status enumeration.
 */
public enum Status {
    OPEN("Open"),
    WAITING_FOR_RESPONSE("Waiting for Customer Response"),
    CLOSED("Closed"),
    DUPLICATE("Duplicate"),
    IN_PROGRESS("In Progress"),
    REOPENED("Reopened"),
    CANNOT_REPRODUCE("Cannot Reproduce"),
    SOLVED("Solved"),
    WONT_IMPLEMENT("Won&#39;t Implement"),
    VERIFIED("Verified");

    private final String value;

    Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
