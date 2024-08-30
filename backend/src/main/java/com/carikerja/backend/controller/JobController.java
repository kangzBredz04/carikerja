package com.carikerja.backend.controller;

import com.carikerja.backend.model.Job;
import com.carikerja.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobRepository.save(job);
    }

    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job updatedJob) {
        Job job = jobRepository.findById(id).orElse(null);
        if (job != null) {
            job.setJobField(updatedJob.getJobField());
            job.setJobTitle(updatedJob.getJobTitle());
            job.setJobType(updatedJob.getJobType());
            job.setWorkSystem(updatedJob.getWorkSystem());
            job.setLocation(updatedJob.getLocation());
            job.setJobDescription(updatedJob.getJobDescription());
            job.setMinSalary(updatedJob.getMinSalary());
            job.setMaxSalary(updatedJob.getMaxSalary());
            job.setMinAge(updatedJob.getMinAge());
            job.setMaxAge(updatedJob.getMaxAge());
            job.setGenderPreference(updatedJob.getGenderPreference());
            job.setRequiredSkills(updatedJob.getRequiredSkills());
            job.setRequiredEducation(updatedJob.getRequiredEducation());
            job.setRequiredExperience(updatedJob.getRequiredExperience());
            job.setCvLink(updatedJob.getCvLink());
            return jobRepository.save(job);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
    }
}
