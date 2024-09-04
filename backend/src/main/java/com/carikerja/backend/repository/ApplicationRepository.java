package com.carikerja.backend.repository;

import com.carikerja.backend.model.Application;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    // Method to find applications by JobSeeker ID
    List<Application> findByJobSeekerId(Long jobSeekerId);

    @Query("SELECT a FROM Application a WHERE a.jobSeeker.id = :jobSeekerId AND a.job.id = :jobId")
    Optional<Application> findApplicationByJobSeekerIdAndJobId(
            @Param("jobSeekerId") Long jobSeekerId,
            @Param("jobId") Long jobId);
}
