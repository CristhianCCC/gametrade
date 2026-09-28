package com.parent.game.entity;
import com.parent.dto_shared.enums.Condition;
import com.parent.dto_shared.enums.Genre;
import com.parent.dto_shared.enums.Platform;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "game")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long gameId;

    private String name;

    private LocalDateTime publishedAt;

    private String description;

    private Date releasedAt;

    @Enumerated(EnumType.STRING)
    private Condition condition;

    @Enumerated(EnumType.STRING)
    private Platform platform;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    //trading game info

    private String tradingGame;

    @OneToMany(
            mappedBy = "game",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<GameImage> images;

    public Game () { }


    public Game(Long gameId, String name, LocalDateTime publishedAt, String description, Date releasedAt,
                Condition condition, Platform platform, Genre genre, String tradingGame) {
        this.gameId = gameId;
        this.name = name;
        this.publishedAt = publishedAt;
        this.description = description;
        this.releasedAt = releasedAt;
        this.condition = condition;
        this.platform = platform;
        this.genre = genre;
        this.tradingGame = tradingGame;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(LocalDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getReleasedAt() {
        return releasedAt;
    }

    public void setReleasedAt(Date releasedAt) {
        this.releasedAt = releasedAt;
    }

    public Condition getCondition() {
        return condition;
    }

    public void setCondition(Condition condition) {
        this.condition = condition;
    }

    public Platform getPlatform() {
        return platform;
    }

    public void setPlatform(Platform platform) {
        this.platform = platform;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public String getTradingGame() {
        return tradingGame;
    }

    public void setTradingGame(String tradingGame) {
        this.tradingGame = tradingGame;
    }
    public List<GameImage> getImages() {
        return images;
    }

    public void setImages(List<GameImage> images) {
        this.images = images;
    }
}
