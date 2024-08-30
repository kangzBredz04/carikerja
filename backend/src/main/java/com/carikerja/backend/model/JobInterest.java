package com.carikerja.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "job_interests")
public class JobInterest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_seeker_id", referencedColumnName = "id")
    private JobSeeker jobSeeker;

    private String jobField;
    private String jobType; // e.g., full-time, part-time, contract, freelance
    private String workSystem; // e.g., remote, in-office, hybrid
    private String locationPreference;
}
