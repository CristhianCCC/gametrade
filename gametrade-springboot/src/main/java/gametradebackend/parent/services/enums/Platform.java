package gametradebackend.parent.services.enums;

public enum Platform {
    PLAYSTATION_5 ("1"),
    PLAYSTATION_4 ("2"),
    PLAYSTATION_3 ("3"),
    PLAYSTATION_2 ("4"),
    PLAYSTATION_1 ("5"),
    NINTENDO_SWITCH_2 ("6"),
    NINTENDO_SWITCH ("7"),
    NINTENDO_3DS ("8"),
    NINTENDO_DS ("9"),
    NINTENDO_WII_U ("10"),
    NINTENDO_WII ("11"),
    NINTENDO_GAMECUBE ("12"),
    NINTENDO_64 ("13"),
    XBOX_SERIES_X_S ("14"),
    XBOX_ONE ("15"),
    XBOX_360 ("16"),
    XBOX ("17"),
    PC ("18");

    private final String code;

    Platform (String code){
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
