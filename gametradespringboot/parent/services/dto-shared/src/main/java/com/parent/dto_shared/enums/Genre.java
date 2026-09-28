package com.parent.dto_shared.enums;

public enum Genre {

    ACTION("1"),
    ADVENTURE("2"),
    ROLE_PLAYING("3"),
    STRATEGY("4"),
    SIMULATION("5"),
    SPORTS("6"),
    RACING("7"),
    FIGHTING("8"),
    PLATFORMER("9"),
    PUZZLE("10"),
    HORROR("11"),
    SURVIVAL("12"),
    SHOOTER("13"),
    FIRST_PERSON_SHOOTER("14"),
    THIRD_PERSON_SHOOTER("15"),
    BATTLE_ROYALE("16"),
    STEALTH("17"),
    MMORPG("18"),
    MOBA("19"),
    METROIDVANIA("20"),
    SOULSLIKE("21"),
    SANDBOX("22"),
    OPEN_WORLD("23"),
    HACK_AND_SLASH("24"),
    BEAT_EM_UP("25"),
    VISUAL_NOVEL("26"),
    TACTICAL("27"),
    TURN_BASED("28"),
    REAL_TIME_STRATEGY("29"),
    TOWER_DEFENSE("30"),
    CARD_GAME("31"),
    MUSIC("32"),
    PARTY("33"),
    ARCADE("34"),
    INDIE("35"),
    SURVIVAL_HORROR("36"),
    SCI_FI("37"),
    FANTASY("38");

    private final String code;

    Genre(String code) {
        this.code = code;
    }

    public String code() {
        return code;
    }
}