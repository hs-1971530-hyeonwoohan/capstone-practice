package com.passionroad.passionroad.repository;

import com.passionroad.passionroad.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> { // <Entity type, PK type>
    Optional<User> findByEmail(String email);
}
