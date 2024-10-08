package com.carikerja.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employer_id", referencedColumnName = "id")
    private Employer employer;

    private String jobField;
    private String jobTitle;
    private String jobType;
    private String workSystem;
    private String location;
    private String jobDescription;
    private Integer minSalary;
    private Integer maxSalary;
    private Integer minAge;
    private Integer maxAge;
    private String genderPreference;
    private String requiredSkills;
    private String requiredEducation;
    private String requiredExperience;
    private Integer applicants;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
}
