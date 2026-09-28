package com.parent.game.entity;
import com.parent.dto_shared.enums.ImageType;
import jakarta.persistence.*;

@Entity
@Table(name = "gameimage")
public class GameImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    private ImageType type;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    public GameImage () { }

    public GameImage(Long id, String imageUrl, ImageType type, Game game) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.type = type;
        this.game = game;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ImageType getType() {
        return type;
    }

    public void setType(ImageType type) {
        this.type = type;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}