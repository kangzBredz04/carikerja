package com.carikerja.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carikerja.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
