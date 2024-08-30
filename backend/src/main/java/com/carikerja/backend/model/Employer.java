package com.carikerja.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employers")
public class Employer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String bannerImage;
    private String logoImage;
    private String companyName;
    private String slogan;
    private String address;
    private String companySize;
    private String industry;
    private String websiteLink;
    private String instagramLink;
    private String facebookLink;
    private String linkedinLink;
    private String companyDescription;
}
