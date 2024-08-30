package com.carikerja.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carikerja.backend.model.Education;

public interface EducationRepository extends JpaRepository<Education, Long> {
}
