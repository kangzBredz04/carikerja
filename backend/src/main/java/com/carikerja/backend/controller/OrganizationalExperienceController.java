package com.carikerja.backend.controller;

import com.carikerja.backend.model.OrganizationalExperience;
import com.carikerja.backend.repository.OrganizationalExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizational-experiences")
public class OrganizationalExperienceController {

    @Autowired
    private OrganizationalExperienceRepository organizationalExperienceRepository;

    @GetMapping
    public List<OrganizationalExperience> getAllOrganizationalExperiences() {
        return organizationalExperienceRepository.findAll();
    }

    @PostMapping
    public OrganizationalExperience createOrganizationalExperience(
            @RequestBody OrganizationalExperience organizationalExperience) {
        return organizationalExperienceRepository.save(organizationalExperience);
    }

    @GetMapping("/{id}")
    public OrganizationalExperience getOrganizationalExperienceById(@PathVariable Long id) {
        return organizationalExperienceRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public OrganizationalExperience updateOrganizationalExperience(@PathVariable Long id,
            @RequestBody OrganizationalExperience updatedOrganizationalExperience) {
        OrganizationalExperience organizationalExperience = organizationalExperienceRepository.findById(id)
                .orElse(null);
        if (organizationalExperience != null) {
            organizationalExperience.setOrganizationName(updatedOrganizationalExperience.getOrganizationName());
            organizationalExperience.setPosition(updatedOrganizationalExperience.getPosition());
            organizationalExperience.setStartDate(updatedOrganizationalExperience.getStartDate());
            organizationalExperience.setEndDate(updatedOrganizationalExperience.getEndDate());
            organizationalExperience.setAdditionalInfo(updatedOrganizationalExperience.getAdditionalInfo());
            return organizationalExperienceRepository.save(organizationalExperience);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteOrganizationalExperience(@PathVariable Long id) {
        organizationalExperienceRepository.deleteById(id);
    }
}
