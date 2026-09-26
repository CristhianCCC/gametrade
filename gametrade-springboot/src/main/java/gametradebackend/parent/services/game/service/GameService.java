package gametradebackend.parent.services.game.service;
import gametradebackend.parent.services.dto.GameDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GameService {

    List<GameDto> getAllGamesInfo();

    public GameDto getGameByName (String name);

    public GameDto putGame (Long id, GameDto gameDto);

    public GameDto postGame (GameDto gameDto);

    void deleteGame (Long id);

}
