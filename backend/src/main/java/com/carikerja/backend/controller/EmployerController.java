package com.carikerja.backend.controller;

import com.carikerja.backend.model.Employer;
import com.carikerja.backend.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employers")
public class EmployerController {

    @Autowired
    private EmployerRepository employerRepository;

    @GetMapping
    public List<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }

    @PostMapping
    public Employer createEmployer(@RequestBody Employer employer) {
        return employerRepository.save(employer);
    }

    @GetMapping("/{id}")
    public Employer getEmployerById(@PathVariable Long id) {
        return employerRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Employer updateEmployer(@PathVariable Long id, @RequestBody Employer updatedEmployer) {
        Employer employer = employerRepository.findById(id).orElse(null);
        if (employer != null) {
            employer.setBannerImage(updatedEmployer.getBannerImage());
            employer.setLogoImage(updatedEmployer.getLogoImage());
            employer.setCompanyName(updatedEmployer.getCompanyName());
            employer.setSlogan(updatedEmployer.getSlogan());
            employer.setAddress(updatedEmployer.getAddress());
            employer.setCompanySize(updatedEmployer.getCompanySize());
            employer.setIndustry(updatedEmployer.getIndustry());
            employer.setWebsiteLink(updatedEmployer.getWebsiteLink());
            employer.setInstagramLink(updatedEmployer.getInstagramLink());
            employer.setFacebookLink(updatedEmployer.getFacebookLink());
            employer.setLinkedinLink(updatedEmployer.getLinkedinLink());
            employer.setCompanyDescription(updatedEmployer.getCompanyDescription());
            return employerRepository.save(employer);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteEmployer(@PathVariable Long id) {
        employerRepository.deleteById(id);
    }
}
