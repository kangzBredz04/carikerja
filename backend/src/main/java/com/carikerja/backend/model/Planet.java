package com.carikerja.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
public class Planet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double diameter;

    private Double distanceFromStar;

    public String getStar() {
        return "Sun/Solar";
    }

    public String getGalaxy() {
        return "Milky Way";
    }
}