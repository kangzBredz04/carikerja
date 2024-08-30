package com.carikerja.backend.controller;

import com.carikerja.backend.model.Interview;
import com.carikerja.backend.repository.InterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    @Autowired
    private InterviewRepository interviewRepository;

    @GetMapping
    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    @PostMapping
    public Interview createInterview(@RequestBody Interview interview) {
        return interviewRepository.save(interview);
    }

    @GetMapping("/{id}")
    public Interview getInterviewById(@PathVariable Long id) {
        return interviewRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Interview updateInterview(@PathVariable Long id, @RequestBody Interview updatedInterview) {
        Interview interview = interviewRepository.findById(id).orElse(null);
        if (interview != null) {
            interview.setInterviewDate(updatedInterview.getInterviewDate());
            interview.setInterviewMode(updatedInterview.getInterviewMode());
            interview.setInterviewStatus(updatedInterview.getInterviewStatus());
            return interviewRepository.save(interview);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteInterview(@PathVariable Long id) {
        interviewRepository.deleteById(id);
    }
}
