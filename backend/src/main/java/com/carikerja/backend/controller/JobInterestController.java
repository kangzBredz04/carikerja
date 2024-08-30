package com.carikerja.backend.controller;

import com.carikerja.backend.model.JobInterest;
import com.carikerja.backend.repository.JobInterestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-interests")
public class JobInterestController {

    @Autowired
    private JobInterestRepository jobInterestRepository;

    @GetMapping
    public List<JobInterest> getAllJobInterests() {
        return jobInterestRepository.findAll();
    }

    @PostMapping
    public JobInterest createJobInterest(@RequestBody JobInterest jobInterest) {
        return jobInterestRepository.save(jobInterest);
    }

    @GetMapping("/{id}")
    public JobInterest getJobInterestById(@PathVariable Long id) {
        return jobInterestRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public JobInterest updateJobInterest(@PathVariable Long id, @RequestBody JobInterest updatedJobInterest) {
        JobInterest jobInterest = jobInterestRepository.findById(id).orElse(null);
        if (jobInterest != null) {
            jobInterest.setJobField(updatedJobInterest.getJobField());
            jobInterest.setJobType(updatedJobInterest.getJobType());
            jobInterest.setWorkSystem(updatedJobInterest.getWorkSystem());
            jobInterest.setLocationPreference(updatedJobInterest.getLocationPreference());
            return jobInterestRepository.save(jobInterest);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteJobInterest(@PathVariable Long id) {
        jobInterestRepository.deleteById(id);
    }
}
