package com.carikerja.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carikerja.backend.model.JobSeeker;
import com.carikerja.backend.repository.JobSeekerRepository;

import java.util.List;

@RestController
@RequestMapping("/api/job-seekers")
public class JobSeekerController {

    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    @GetMapping
    public List<JobSeeker> getAllJobSeekers() {
        return jobSeekerRepository.findAll();
    }

    @PostMapping
    public JobSeeker createJobSeeker(@RequestBody JobSeeker jobSeeker) {
        return jobSeekerRepository.save(jobSeeker);
    }

    @GetMapping("/{id}")
    public JobSeeker getJobSeekerById(@PathVariable Long id) {
        return jobSeekerRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public JobSeeker updateJobSeeker(@PathVariable Long id, @RequestBody JobSeeker updatedJobSeeker) {
        // System.out.println(updatedJobSeeker);
        JobSeeker jobSeeker = jobSeekerRepository.findById(id).orElse(null);
        if (jobSeeker != null) {
            jobSeeker.setName(updatedJobSeeker.getName());
            jobSeeker.setBirthDate(updatedJobSeeker.getBirthDate());
            jobSeeker.setPhoneNumber(updatedJobSeeker.getPhoneNumber());
            jobSeeker.setEmail(updatedJobSeeker.getEmail());
            jobSeeker.setLocation(updatedJobSeeker.getLocation());
            jobSeeker.setGender(updatedJobSeeker.getGender());
            jobSeeker.setAboutMe(updatedJobSeeker.getAboutMe());
            jobSeeker.setHasWorkExperience(updatedJobSeeker.getHasWorkExperience());
            jobSeeker.setResume(updatedJobSeeker.getResume());
            jobSeeker.setPortfolioLink(updatedJobSeeker.getPortfolioLink());
            jobSeeker.setGithubLink(updatedJobSeeker.getGithubLink());
            jobSeeker.setWillingToWorkRemotely(updatedJobSeeker.getWillingToWorkRemotely());
            return jobSeekerRepository.save(jobSeeker);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteJobSeeker(@PathVariable Long id) {
        jobSeekerRepository.deleteById(id);
    }
}
