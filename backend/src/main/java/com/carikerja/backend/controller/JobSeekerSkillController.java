package com.carikerja.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carikerja.backend.model.JobSeekerSkill;
import com.carikerja.backend.repository.JobSeekerSkillRepository;

import java.util.List;

@RestController
@RequestMapping("/api/job-seeker-skills")
public class JobSeekerSkillController {

    @Autowired
    private JobSeekerSkillRepository jobSeekerSkillRepository;

    @GetMapping
    public List<JobSeekerSkill> getAllJobSeekerSkills() {
        return jobSeekerSkillRepository.findAll();
    }

    @PostMapping
    public JobSeekerSkill createJobSeekerSkill(@RequestBody JobSeekerSkill jobSeekerSkill) {
        return jobSeekerSkillRepository.save(jobSeekerSkill);
    }

    @GetMapping("/{id}")
    public JobSeekerSkill getJobSeekerSkillById(@PathVariable Long id) {
        return jobSeekerSkillRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public JobSeekerSkill updateJobSeekerSkill(@PathVariable Long id,
            @RequestBody JobSeekerSkill updatedJobSeekerSkill) {
        JobSeekerSkill jobSeekerSkill = jobSeekerSkillRepository.findById(id).orElse(null);
        if (jobSeekerSkill != null) {
            jobSeekerSkill.setSkill(updatedJobSeekerSkill.getSkill());
            jobSeekerSkill.setLevel(updatedJobSeekerSkill.getLevel());
            return jobSeekerSkillRepository.save(jobSeekerSkill);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteJobSeekerSkill(@PathVariable Long id) {
        jobSeekerSkillRepository.deleteById(id);
    }

    @GetMapping("/job-seeker/{jobSeekerId}")
    public List<JobSeekerSkill> getSkillsByJobSeekerId(@PathVariable Long jobSeekerId) {
        return jobSeekerSkillRepository.findByJobSeekerId(jobSeekerId);
    }
}
