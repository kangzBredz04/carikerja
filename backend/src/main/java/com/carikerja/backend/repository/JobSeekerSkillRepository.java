package com.carikerja.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carikerja.backend.model.JobSeekerSkill;

public interface JobSeekerSkillRepository extends JpaRepository<JobSeekerSkill, Long> {
    List<JobSeekerSkill> findByJobSeekerId(Long jobSeekerId);
}
