package com.parent.game.service;
import com.parent.dto_shared.dto.GameDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GameService {

    public List<GameDTO> findAllGames ();

    public GameDTO getGameById (Long gameId);

    public GameDTO findbyName (String name);

    public GameDTO postGame (GameDTO gameDTO);

    public GameDTO putGame (Long gameId, GameDTO gameDTO);

    public void deleteGame (Long gameId);

}
