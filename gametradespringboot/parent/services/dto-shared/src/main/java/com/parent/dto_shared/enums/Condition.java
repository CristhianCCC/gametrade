package com.parent.dto_shared.enums;

public enum Condition {

    NEW("1"),
    LIKE_NEW("2"),
    GOOD("3"),
    ACCEPTABLE("4"),
    USED("5");

    private final String code;

    Condition (String code) {
        this.code = code;
    }

    public String code() {
        return code;
    }
}