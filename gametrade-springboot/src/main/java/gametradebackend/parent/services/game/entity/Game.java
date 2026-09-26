package gametradebackend.parent.services.game.entity;
import java.time.LocalDate;
import gametradebackend.parent.services.enums.Platform;
import gametradebackend.parent.services.enums.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table (name = "game")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private LocalDate fechaLanzamiento;
    private LocalDate fechaPublicacion;


    @Enumerated(EnumType.STRING)
    private Status estado;

    @Enumerated(EnumType.STRING)
    private Platform plataforma;


    public Game() {
    }

    public Game(Long id, String nombre, LocalDate fechaLanzamiento, LocalDate fechaPublicacion,
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
