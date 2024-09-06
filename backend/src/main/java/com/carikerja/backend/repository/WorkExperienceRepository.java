package com.carikerja.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carikerja.backend.model.WorkExperience;

public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long> {
    List<WorkExperience> findByJobSeekerId(Long jobSeekerId);
}
