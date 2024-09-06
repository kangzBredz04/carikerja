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

    @GetMapping("/jobseeker/{jobSeekerId}")
    public List<Application> getApplicationsByJobSeekerId(@PathVariable Long jobSeekerId) {
        return applicationRepository.findByJobSeekerId(jobSeekerId);
    }

    @GetMapping("/jobseeker/{jobSeekerId}/job/{jobId}")
    public Application getApplicationByJobSeekerAndJob(
            @PathVariable Long jobSeekerId,
            @PathVariable Long jobId) {
        return applicationRepository.findApplicationByJobSeekerIdAndJobId(jobSeekerId, jobId)
                .orElse(null); // Return null if not found
    }

    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationsByJobId(@PathVariable Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    @PutMapping("/{id}/status")
    public Application updateApplicationStatus(@PathVariable Long id, @RequestBody String status) {
        // Menghapus tanda kutip dari status jika ada
        String cleanedStatus = status.replace("\"", "");

        Application application = applicationRepository.findById(id).orElse(null);
        if (application != null) {
            application.setStatus(cleanedStatus);
            return applicationRepository.save(application);
        }
        return null; // atau bisa lempar exception jika aplikasi tidak ditemukan
    }
}
