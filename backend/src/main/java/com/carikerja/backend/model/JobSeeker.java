package com.carikerja.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "job_seekers")
public class JobSeeker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String name;
    private String birthDate;
    private String phoneNumber;
    private String email;
    private String location;
    private Integer age;
    private String gender;
    private String aboutMe;
    private Boolean hasWorkExperience;
    private String resume;
    private String portfolioLink;
    private String githubLink;
    private Boolean willingToWorkRemotely;
}
