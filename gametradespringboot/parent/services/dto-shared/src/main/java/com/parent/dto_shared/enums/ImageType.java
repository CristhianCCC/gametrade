package com.parent.dto_shared.enums;

public enum ImageType {

    FRONT("1"),
    BACK("2"),
    DISC("3");

    private final String code;

    ImageType(String code) {
        this.code = code;
    }

    public String code() {
        return code;
    }
}