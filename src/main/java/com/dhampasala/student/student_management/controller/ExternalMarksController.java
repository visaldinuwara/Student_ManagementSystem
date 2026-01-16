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

import com.dhampasala.student.student_management.model.dto.ExternalMarksDTO;
import com.dhampasala.student.student_management.service.ExternalMarksService;
@RestController
@RequestMapping("/externalmarks")
@CrossOrigin(origins = "*")
public class ExternalMarksController {
        @Autowired
    private ExternalMarksService externalMarksService;
    @PostMapping("/save")
    public void addExternalMarks(@RequestBody ExternalMarksDTO externalMarksDTO){
        externalMarksService.addExternalMarks(externalMarksDTO);
    }
    @PostMapping("/update")
    public void updateExternalMarks(@RequestBody ExternalMarksDTO externalMarksDTO) {
        externalMarksService.updateExternalMarks(externalMarksDTO);
    }
    @PostMapping("/delete")
    public void deleteExternalMarks(@RequestBody ExternalMarksDTO externalMarksDTO){
        externalMarksService.deleteExternalMarks(externalMarksDTO);
    }
    @GetMapping("/search/{studentId}")
    public Optional<ExternalMarksDTO> searchExternalMarks(@PathVariable String studentId){
        return externalMarksService.searchExternalMarks(studentId);
    }
    @GetMapping("/all")
    public List<ExternalMarksDTO> getAll(){
        return externalMarksService.getAll();
    }
}
