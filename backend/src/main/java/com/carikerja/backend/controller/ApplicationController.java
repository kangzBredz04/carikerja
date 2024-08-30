package com.carikerja.backend.controller;

import com.carikerja.backend.model.Application;
import com.carikerja.backend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @PostMapping
    public Application createApplication(@RequestBody Application application) {
        return applicationRepository.save(application);
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Application updateApplication(@PathVariable Long id, @RequestBody Application updatedApplication) {
        Application application = applicationRepository.findById(id).orElse(null);
        if (application != null) {
            application.setStatus(updatedApplication.getStatus());
            application.setAppliedAt(updatedApplication.getAppliedAt());
            return applicationRepository.save(application);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        applicationRepository.deleteById(id);
    }
}
