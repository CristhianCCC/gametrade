package gametradebackend.parent.services.enums;

public enum Status {
    EXCELENTE ("1"),
    BUENO ("2"),
    CAJA_CON_DETALLES ("3");

    private final String code;

    Status (String code){
        this.code = code;
    }
    public String getCode() {
        return code;
    }
}
