package com.carikerja.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carikerja.backend.model.JobSeeker;

public interface JobSeekerRepository extends JpaRepository<JobSeeker, Long> {
}
