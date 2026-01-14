package com.dhampasala.student.student_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
public class ExternelActivityController {
        @Autowired
    private ExternalActivitiesService externalActivitiesService;
    @PostMapping("/save")
    private void addExternalActivity(@RequestBody ExternalActivitiesDTO externalActivitiesDTO){
      externalActivitiesService.addExternalActivity(externalActivitiesDTO);
    }
    @PostMapping("/update")
    private void updateExternalActivity(@RequestBody ExternalActivitiesDTO externalActivitiesDTO) {
      externalActivitiesService.updateExternalActivity(externalActivitiesDTO);
    }
    @PostMapping("/delete")
    private void deleteExternalActivity(@RequestBody ExternalActivitiesDTO externalActivitiesDTO){
      externalActivitiesService.deleteExternalActivity(externalActivitiesDTO);
    }
    @GetMapping("/search/{studentId}")
    private ExternalActivitiesDTO searchExternalActivity(@PathVariable String studentId){
        return externalActivitiesService.searchExternalActivity(studentId);
    }
    @GetMapping("/all")
    private List<ExternalActivitiesDTO> getAll(){
      return externalActivitiesService.getAll();
    }
}
