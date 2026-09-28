package com.parent.dto_shared.dto;

import com.parent.dto_shared.enums.Condition;
import com.parent.dto_shared.enums.Genre;
import com.parent.dto_shared.enums.Platform;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class GameDTO {

    private Long gameId;

    private String name;

    private LocalDateTime publishedAt;

    private String description;

    private Date releasedAt;

    private Condition condition;

    private Platform platform;

    private Genre genre;

    private String tradingGame;

    private List<GameImageDTO> images;

    public GameDTO() { }


    public GameDTO(Long gameId, String name, LocalDateTime publishedAt, String description, Date releasedAt,
                   Condition condition, Platform platform, Genre genre, String tradingGame,
                   List<GameImageDTO> images) {

        this.images = images;
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

    public List<GameImageDTO> getImages() {
        return images;
    }

    public void setImages(List<GameImageDTO> images) {
        this.images = images;
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
}
