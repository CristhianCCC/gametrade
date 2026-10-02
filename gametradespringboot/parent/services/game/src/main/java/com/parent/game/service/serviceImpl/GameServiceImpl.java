package com.parent.game.service.serviceImpl;
import com.parent.dto_shared.dto.GameDTO;
import com.parent.dto_shared.dto.GameImageDTO;
import com.parent.game.entity.Game;
import com.parent.game.entity.GameImage;
import com.parent.game.repository.GameRepository;
import com.parent.game.service.GameService;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    //dto to entity
    private Game convertToEntity(GameDTO gameDTO) {
        Game game = new Game(
                gameDTO.getGameId(),
                gameDTO.getName(),
                gameDTO.getPublishedAt(),
                gameDTO.getDescription(),
                gameDTO.getReleasedAt(),
                gameDTO.getCondition(),
                gameDTO.getPlatform(),
                gameDTO.getGenre(),
                gameDTO.getTradingGame()
        );
        if (gameDTO.getImages() != null) {
            List<GameImage> images = new ArrayList<>();
            for (GameImageDTO imageDTO : gameDTO.getImages()) {

                GameImage image = new GameImage(
                        imageDTO.getId(),
                        imageDTO.getImageUrl(),
                        imageDTO.getType(),
                        game
                );
                images.add(image);
            }
            game.setImages(images);
        }
        return game;
    }

    //entity to dto
    private GameDTO convertToDTO(Game game) {
        List<GameImageDTO> images = new ArrayList<>();
        if (game.getImages() != null) {

            for (GameImage image : game.getImages()) {

                GameImageDTO imageDTO = new GameImageDTO(
                        image.getId(),
                        image.getImageUrl(),
                        image.getType());
                images.add(imageDTO);
            }
        }

        return new GameDTO(
                game.getGameId(),
                game.getName(),
                game.getPublishedAt(),
                game.getDescription(),
                game.getReleasedAt(),
                game.getCondition(),
                game.getPlatform(),
                game.getGenre(),
                game.getTradingGame(),
                images
        );
    }

    @Override
    public List<GameDTO> findAllGames() {

        return gameRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }


    @Override
    public GameDTO getGameById(Long gameId) {

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() ->
                        new RuntimeException("Game not found with id: " + gameId)
                );

        return convertToDTO(game);
    }


    @Override
    public GameDTO findbyName(String name) {
        Game game = gameRepository.findByName(name).orElseThrow(()-> new RuntimeException("game not found"));
        return convertToDTO(game);
    }


    @Override
    public GameDTO postGame(GameDTO gameDTO) {

        Game game = convertToEntity(gameDTO);

        Game savedGame = gameRepository.save(game);

        return convertToDTO(savedGame);
    }


    @Override
    public GameDTO putGame(Long gameId, GameDTO gameDTO) {

        Game existingGame = gameRepository.findById(gameId)
                .orElseThrow(() ->
                        new RuntimeException("Game not found with id: " + gameId)
                );

        existingGame.setName(gameDTO.getName());
        existingGame.setDescription(gameDTO.getDescription());
        existingGame.setReleasedAt(gameDTO.getReleasedAt());
        existingGame.setCondition(gameDTO.getCondition());
        existingGame.setPlatform(gameDTO.getPlatform());
        existingGame.setGenre(gameDTO.getGenre());
        existingGame.setTradingGame(gameDTO.getTradingGame());

        // Actualizar / agregar imágenes
        if (gameDTO.getImages() != null) {

            for (GameImageDTO imageDTO : gameDTO.getImages()) {

                // Si tiene ID, buscamos la imagen existente
                if (imageDTO.getId() != null) {

                    GameImage existingImage = existingGame.getImages()
                            .stream()
                            .filter(image -> image.getId().equals(imageDTO.getId()))
                            .findFirst()
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Image not found with id: " + imageDTO.getId()
                                    )
                            );

                    existingImage.setImageUrl(imageDTO.getImageUrl());
                    existingImage.setType(imageDTO.getType());

                } else {

                    // Si no tiene ID, es una imagen nueva
                    GameImage newImage = new GameImage(
                            null,
                            imageDTO.getImageUrl(),
                            imageDTO.getType(),
                            existingGame
                    );

                    existingGame.getImages().add(newImage);
                }
            }
        }

        Game updatedGame = gameRepository.save(existingGame);

        return convertToDTO(updatedGame);
    }


    @Override
    public void deleteGame(Long gameId) {

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() ->
                        new RuntimeException("Game not found with id: " + gameId)
                );

        gameRepository.delete(game);
    }
}