package com.parent.game.controller;
import com.parent.dto_shared.dto.GameDTO;
import com.parent.game.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping
    public ResponseEntity<List<GameDTO>> getAllGames() {

        List<GameDTO> gameDTO = gameService.findAllGames();

        return ResponseEntity.status(HttpStatus.OK).body(gameDTO);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<GameDTO> getGameById(
            @PathVariable("id") Long id) {

        GameDTO gameDTO = gameService.getGameById(id);

        return ResponseEntity.ok(gameDTO);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<GameDTO> getGameByName(
            @PathVariable("name") String name) {

        GameDTO gameDTO = gameService.findbyName(name);

        return ResponseEntity.ok(gameDTO);
    }

    @PostMapping
    public ResponseEntity<GameDTO> postGame(
            @RequestBody GameDTO gameDTO) {

        GameDTO gameDTO1 = gameService.postGame(gameDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(gameDTO1);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameDTO> putGame(
            @PathVariable Long id,
            @RequestBody GameDTO gameDTO) {

        GameDTO gameDTO1 = gameService.putGame(id, gameDTO);

        return ResponseEntity.ok(gameDTO1);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(
            @PathVariable Long id) {

        gameService.deleteGame(id);

        return ResponseEntity.noContent().build();
    }
}
