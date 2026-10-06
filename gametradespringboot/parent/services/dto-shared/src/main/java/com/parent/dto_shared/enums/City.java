package com.parent.dto_shared.enums;

public enum City {

    BOGOTA("11001"),
    MEDELLIN("05001"),
    CALI("76001"),
    BARRANQUILLA("08001"),
    CARTAGENA("13001"),
    CUCUTA("54001"),
    BUCARAMANGA("68001"),
    PEREIRA("66001"),
    SANTA_MARTA("47001"),
    IBAGUE("73001"),
    MANIZALES("17001"),
    VILLAVICENCIO("50001"),
    PASTO("52001"),
    MONTERIA("23001"),
    NEIVA("41001"),
    ARMENIA("63001"),
    POPAYAN("19001"),
    VALLEDUPAR("20001"),
    SINCELEJO("70001"),
    TUNJA("15001"),
    RIOHACHA("44001"),
    QUIBDO("27001"),
    FLORENCIA("18001"),
    YOPAL("85001"),
    LETICIA("91001"),
    MOCOA("86001"),
    PUERTO_CARRENO("99001"),
    INIRIDA("94001"),
    SAN_JOSE_DEL_GUAVIARE("95001"),
    MITU("97001"),
    ARAUCA("81001"),
    SAN_ANDRES("88001");

    private final String code;

    City(String code) {
        this.code = code;
    }

    public String code() {
        return code;
    }
}