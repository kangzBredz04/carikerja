package com.carikerja.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carikerja.backend.model.Education;
import com.carikerja.backend.repository.EducationRepository;

import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    @Autowired
    private EducationRepository educationRepository;

    @GetMapping
    public List<Education> getAllEducations() {
        return educationRepository.findAll();
    }

    @PostMapping
    public Education createEducation(@RequestBody Education education) {
        return educationRepository.save(education);
    }

    @GetMapping("/{id}")
    public Education getEducationById(@PathVariable Long id) {
        return educationRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Education updateEducation(@PathVariable Long id, @RequestBody Education updatedEducation) {
        Education education = educationRepository.findById(id).orElse(null);
        if (education != null) {
            education.setDegreeLevel(updatedEducation.getDegreeLevel());
            education.setInstitutionName(updatedEducation.getInstitutionName());
            education.setFieldOfStudy(updatedEducation.getFieldOfStudy());
            return educationRepository.save(education);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteEducation(@PathVariable Long id) {
        educationRepository.deleteById(id);
    }
}
