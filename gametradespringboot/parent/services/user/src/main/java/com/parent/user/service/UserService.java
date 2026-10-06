package com.parent.user.service;

import com.parent.dto_shared.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    public List<UserDTO> getAllUsers ();

    public UserDTO getById (Long id);

    public UserDTO postUser (UserDTO userDTO);

    public UserDTO putUser (Long id, UserDTO userDto);

    public void deleteUser (Long id);

}