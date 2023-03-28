package com.passionroad.passionroad.repository;

import com.passionroad.passionroad.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> { // <Entity type, PK type>
    Users findByEmail(String email);
}
