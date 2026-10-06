package com.parent.user.controller;
import com.parent.dto_shared.dto.UserDTO;
import com.parent.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {

        List<UserDTO> userDTO = userService.getAllUsers();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userDTO);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<UserDTO> getUserById(
            @PathVariable("id") Long id) {

        UserDTO userDTO = userService.getById(id);

        return ResponseEntity.ok(userDTO);
    }

    @PostMapping
    public ResponseEntity<UserDTO> postUser(
            @RequestBody UserDTO userDTO) {

        UserDTO userDTO1 = userService.postUser(userDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userDTO1);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> putUser(
            @PathVariable("id") Long id,
            @RequestBody UserDTO userDTO) {

        UserDTO userDTO1 = userService.putUser(id, userDTO);

        return ResponseEntity.ok(userDTO1);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable("id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}