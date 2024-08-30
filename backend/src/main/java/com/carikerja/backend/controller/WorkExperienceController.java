package com.carikerja.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carikerja.backend.model.WorkExperience;
import com.carikerja.backend.repository.WorkExperienceRepository;

import java.util.List;

@RestController
@RequestMapping("/api/work_experience")
public class WorkExperienceController {

    @Autowired
    private WorkExperienceRepository workExperienceRepository;

    @GetMapping
    public List<WorkExperience> getAllWorkExperiences() {
        return workExperienceRepository.findAll();
    }

    @PostMapping
    public WorkExperience createWorkExperience(@RequestBody WorkExperience workExperience) {
        return workExperienceRepository.save(workExperience);
    }

    @GetMapping("/{id}")
    public WorkExperience getWorkExperienceById(@PathVariable Long id) {
        return workExperienceRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public WorkExperience updateWorkExperience(@PathVariable Long id,
            @RequestBody WorkExperience updatedWorkExperience) {
        WorkExperience workExperience = workExperienceRepository.findById(id).orElse(null);
        if (workExperience != null) {
            workExperience.setPosition(updatedWorkExperience.getPosition());
            workExperience.setCompanyName(updatedWorkExperience.getCompanyName());
            workExperience.setStartDate(updatedWorkExperience.getStartDate());
            workExperience.setEndDate(updatedWorkExperience.getEndDate());
            return workExperienceRepository.save(workExperience);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteWorkExperience(@PathVariable Long id) {
        workExperienceRepository.deleteById(id);
    }
}
