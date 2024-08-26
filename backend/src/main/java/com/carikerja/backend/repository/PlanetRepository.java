package com.carikerja.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carikerja.backend.model.Planet;

public interface PlanetRepository extends JpaRepository<Planet, Long> {

}
