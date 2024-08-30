package com.carikerja.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "work_experience")
public class WorkExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_seeker_id", referencedColumnName = "id")
    private JobSeeker jobSeeker;

    private String position;
    private String companyName;
    private String startDate;
    private String endDate;
    private String additionalInfo;
}
