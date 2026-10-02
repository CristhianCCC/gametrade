package com.parent.dto_shared.dto;
import com.parent.dto_shared.enums.ImageType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class GameImageDTO {

    private Long id;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private ImageType type;

    public GameImageDTO() {
    }

    public GameImageDTO(Long id, String imageUrl, ImageType type) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ImageType getType() {
        return type;
    }

    public void setType(ImageType type) {
        this.type = type;
    }
}