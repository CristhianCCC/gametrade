package com.parent.user.repository;

import com.parent.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <User, Long> {

    /*User findByName (String names);*/

    User getUserByEmail (String email);

}
