package com.carikerja.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carikerja.backend.model.Skill;
import com.carikerja.backend.repository.SkillRepository;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillRepository skillRepository;

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @PostMapping
    public Skill createSkill(@RequestBody Skill skill) {
        return skillRepository.save(skill);
    }

    @GetMapping("/{id}")
    public Skill getSkillById(@PathVariable Long id) {
        return skillRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Skill updateSkill(@PathVariable Long id, @RequestBody Skill updatedSkill) {
        Skill skill = skillRepository.findById(id).orElse(null);
        if (skill != null) {
            skill.setSkillName(updatedSkill.getSkillName());
            return skillRepository.save(skill);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable Long id) {
        skillRepository.deleteById(id);
    }
}
