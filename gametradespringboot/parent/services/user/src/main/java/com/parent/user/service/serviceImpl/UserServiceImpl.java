package com.parent.user.service.serviceImpl;

import com.parent.dto_shared.dto.UserDTO;
import com.parent.user.entity.User;
import com.parent.user.repository.UserRepository;
import com.parent.user.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // convert DTO to Entity --------------------------------------------------------------------------------------------
    private User toEntity(UserDTO dto) {

        User user = new User();

        user.setId(dto.getId());
        user.setNames(dto.getNames());
        user.setLastnames(dto.getLastnames());
        user.setEmail(dto.getEmail());

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        user.setPhoneNumber(dto.getPhoneNumber());
        user.setDateOfBirth(dto.getDateOfBirth());
        user.setCity(dto.getCity());

        return user;
    }

    // convert Entity to DTO --------------------------------------------------------------------------------------------
    private UserDTO toDTO(User user) {

        UserDTO dto = new UserDTO();

        dto.setId(user.getId());
        dto.setNames(user.getNames());
        dto.setLastnames(user.getLastnames());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setCity(user.getCity());

        return dto;
    }

    @Override
    public List<UserDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public UserDTO getById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found with the ID: " + id)
                );

        return toDTO(user);
    }

    @Override
    public UserDTO postUser(UserDTO userDTO) {

        User user = toEntity(userDTO);

        User userSaved = userRepository.save(user);

        return toDTO(userSaved);
    }

    @Override
    public UserDTO putUser(Long id, UserDTO userDTO) {

        return userRepository.findById(id)
                .map(userFound -> {

                    userFound.setNames(userDTO.getNames());
                    userFound.setLastnames(userDTO.getLastnames());
                    userFound.setEmail(userDTO.getEmail());
                    // Update password only if a new password was provided
                    if (userDTO.getPassword() != null
                            && !userDTO.getPassword().isBlank()) {
                        if (!passwordEncoder.matches(
                                userDTO.getPassword(),
                                userFound.getPassword())) {
                            userFound.setPassword(
                                    passwordEncoder.encode(userDTO.getPassword())
                            );
                        }
                    }

                    userFound.setPhoneNumber(userDTO.getPhoneNumber());
                    userFound.setDateOfBirth(userDTO.getDateOfBirth());
                    userFound.setCity(userDTO.getCity());

                    User userFinal = userRepository.save(userFound);

                    return toDTO(userFinal);

                })
                .orElseThrow(() ->
                        new RuntimeException("User not found with the ID: " + id)
                );
    }

    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with the ID: " + id
                        )
                );
        userRepository.delete(user);
    }
}