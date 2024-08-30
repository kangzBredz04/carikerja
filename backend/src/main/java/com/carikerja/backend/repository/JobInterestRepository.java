package com.carikerja.backend.repository;

import com.carikerja.backend.model.JobInterest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobInterestRepository extends JpaRepository<JobInterest, Long> {
}
