package gametradebackend.parent.services.dto;
import java.time.LocalDate;
import gametradebackend.parent.services.enums.Platform;
import gametradebackend.parent.services.enums.Status;
import gametradebackend.parent.services.game.entity.Game;


public class GameDto {

    private Long id;
    private String nombre;
    private LocalDate fechaLanzamiento;
    private LocalDate fechaPublicacion;

    private Status estado;

    private Platform plataforma;

    private Game juegoIntercambio;

    public GameDto() {
    }

    public GameDto(Long id, String nombre, LocalDate fechaLanzamiento, LocalDate fechaPublicacion,
                Status estado, Platform plataforma) {
        this.id = id;
        this.nombre = nombre;
        this.fechaLanzamiento = fechaLanzamiento;
        this.fechaPublicacion = fechaPublicacion;
        this.estado = estado;
        this.plataforma = plataforma;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public LocalDate getFechaLanzamiento() { return fechaLanzamiento; }
    public void setFechaLanzamiento(LocalDate fechaLanzamiento) { this.fechaLanzamiento = fechaLanzamiento; }
    public LocalDate getFechaPublicacion() { return fechaPublicacion; }
    public void setFechaPublicacion(LocalDate fechaPublicacion) { this.fechaPublicacion = fechaPublicacion; }
    public Status getEstado() { return estado; }
    public void setEstado(Status estado) { this.estado = estado; }
    public Platform getPlataforma() { return plataforma; }
    public void setPlataforma(Platform plataforma) { this.plataforma = plataforma; }
}
