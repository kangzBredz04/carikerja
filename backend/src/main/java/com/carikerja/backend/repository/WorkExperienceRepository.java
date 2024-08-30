package com.carikerja.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carikerja.backend.model.WorkExperience;

public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long> {
}
