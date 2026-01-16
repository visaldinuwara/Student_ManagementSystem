package com.dhampasala.student.student_management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhampasala.student.student_management.model.dto.ExternalActivitiesDTO;
import com.dhampasala.student.student_management.service.ExternalActivitiesService;
@RestController
@RequestMapping("/externelactivity")
@CrossOrigin(origins = "*")
public class ExternelActivityController {
        @Autowired
    private ExternalActivitiesService externalActivitiesService;
    @PostMapping("/save")
    public void addExternalActivity(@RequestBody ExternalActivitiesDTO externalActivitiesDTO){
      externalActivitiesService.addExternalActivity(externalActivitiesDTO);
    }
    @PostMapping("/update")
    public void updateExternalActivity(@RequestBody ExternalActivitiesDTO externalActivitiesDTO) {
      externalActivitiesService.updateExternalActivity(externalActivitiesDTO);
    }
    @PostMapping("/delete")
    public void deleteExternalActivity(@RequestBody ExternalActivitiesDTO externalActivitiesDTO){
      externalActivitiesService.deleteExternalActivity(externalActivitiesDTO);
    }
    @GetMapping("/search/{studentId}")
    public Optional<ExternalActivitiesDTO> searchExternalActivity(@PathVariable String studentId){
        return externalActivitiesService.searchExternalActivity(studentId);
    }
    @GetMapping("/all")
    public List<ExternalActivitiesDTO> getAll(){
      return externalActivitiesService.getAll();
    }
}
