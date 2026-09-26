package gametradebackend.parent.services.game.controller;


import gametradebackend.parent.services.dto.GameDto;
import gametradebackend.parent.services.game.repository.GameRepository;
import gametradebackend.parent.services.game.service.impl.GameServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GamesController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameServiceImpl gameService;

    @GetMapping
    public ResponseEntity<List<GameDto>> getAllGames(){
        List<GameDto> gameDtos = gameService.getAllGamesInfo();
        return ResponseEntity.status(HttpStatus.OK).body(gameDtos);
    }



}
