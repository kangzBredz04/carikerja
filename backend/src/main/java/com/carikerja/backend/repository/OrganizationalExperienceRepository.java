package com.carikerja.backend.repository;

import com.carikerja.backend.model.OrganizationalExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationalExperienceRepository extends JpaRepository<OrganizationalExperience, Long> {
}
