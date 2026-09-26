package gametradebackend.parent.services.game.service.impl;
import gametradebackend.parent.services.dto.GameDto;
import gametradebackend.parent.services.game.entity.Game;
import gametradebackend.parent.services.game.repository.GameRepository;
import gametradebackend.parent.services.game.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
private GameRepository gameRepository;

    //DTO to entity --------------------------------------------------------------------

    private Game toEntity (GameDto dto){
        Game game = new Game();
        game.setId(dto.getId());
        game.setNombre(dto.getNombre());
        game.setEstado(dto.getEstado());
        game.setPlataforma(dto.getPlataforma());
        game.setFechaPublicacion(dto.getFechaPublicacion());
        game.setFechaLanzamiento(dto.getFechaLanzamiento());

        return game;
    }

    //Entity to DTO ---------------------------------------------------------------------

    private GameDto toDto (Game entity){
        GameDto gameDto = new GameDto();
        gameDto.setId(entity.getId());
        gameDto.setNombre(entity.getNombre());
        gameDto.setFechaLanzamiento(entity.getFechaLanzamiento());
        gameDto.setFechaPublicacion(entity.getFechaPublicacion());
        gameDto.setEstado(entity.getEstado());
        gameDto.setPlataforma(entity.getPlataforma());

        return gameDto;
    }



    @Override
    public List<GameDto> getAllGamesInfo() {
        List<Game> games = gameRepository.findAll();
        return games.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public GameDto getGameByName(String name) {
        Game game = gameRepository.findByNombre(name);
        return toDto(game);
    }

    @Override
    public GameDto putGame(Long id, GameDto gameDto) {
       gameRepository.findById(id).map(gameFound -> {
            gameFound.setNombre(gameDto.getNombre());
            gameFound.setEstado(gameDto.getEstado());
            gameFound.setPlataforma(gameDto.getPlataforma());
            gameFound.setFechaLanzamiento(gameDto.getFechaLanzamiento());
            gameFound.setFechaPublicacion(gameDto.getFechaPublicacion());
            return toDto(gameFound);
        }).orElseThrow(() -> new RuntimeException("El juego no fue actualizado correctamente, porfavor vuelva a intentarlo")
        );
        return gameDto;
    }

    @Override
    public GameDto postGame(GameDto gameDto) {
        Game game = toEntity(gameDto);
        Game gameConverted = gameRepository.save(game);
        return toDto(gameConverted);
    }

    @Override
    public void deleteGame(Long id) {
        gameRepository.deleteById(id);
    }
}