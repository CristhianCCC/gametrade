package com.parent.dto_shared.enums;

public enum Platform {

    PLAYSTATION_1("1"),
    PLAYSTATION_2("2"),
    PLAYSTATION_3("3"),
    PLAYSTATION_4("4"),
    PLAYSTATION_5("5"),
    PSP("6"),
    PLAYSTATION_VITA("7"),

    NES("8"),
    SNES("9"),
    NINTENDO_64("10"),
    GAMECUBE("11"),
    WII("12"),
    WII_U("13"),
    NINTENDO_SWITCH("14"),
    GAME_BOY("15"),
    GAME_BOY_ADVANCE("16"),
    NINTENDO_DS("17"),
    NINTENDO_3DS("18"),

    XBOX("19"),
    XBOX_360("20"),
    XBOX_ONE("21"),
    XBOX_SERIES_X("22"),
    XBOX_SERIES_S("23"),

    MASTER_SYSTEM("24"),
    SEGA_GENESIS("25"),
    SEGA_SATURN("26"),
    SEGA_DREAMCAST("27"),
    GAME_GEAR("28");

    private final String code;

    Platform(String code) {
        this.code = code;
    }

    public String code() {
        return code;
    }
}