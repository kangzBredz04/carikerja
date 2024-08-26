package com.carikerja.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carikerja.backend.model.Planet;
import com.carikerja.backend.repository.PlanetRepository;

@RestController
@RequestMapping("api/planets")
public class PlanetController {

    PlanetRepository repository;

    @Autowired
    public PlanetController(PlanetRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Planet> getAll() {
        return repository.findAll();
    }

    @GetMapping("{id}")
    public Planet getById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }
}
