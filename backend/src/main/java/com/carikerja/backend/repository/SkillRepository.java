package com.carikerja.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carikerja.backend.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}
