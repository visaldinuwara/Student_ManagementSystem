package com.dhampasala.student.student_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhampasala.student.student_management.model.dto.ParentObservationDTO;
import com.dhampasala.student.student_management.service.ParentObservationService;

@RestController
@RequestMapping("/ParentObservation")
public class ParentObservationController {
            @Autowired
    private ParentObservationService parentObservationService;
    @PostMapping("/save")
    public void addParentObservation(@RequestBody ParentObservationDTO parentObservationDTO){
        parentObservationService.addParentObservation(parentObservationDTO);
    }
    @PostMapping("/update")
    public void updateParentObservation(@RequestBody ParentObservationDTO parentObservationDTO) {
        parentObservationService.updateParentObservation(parentObservationDTO);
    }
    @PostMapping("/delete")
    public void deleteParentObservation(@RequestBody ParentObservationDTO parentObservationDTO){
        parentObservationService.deleteParentObservation(parentObservationDTO);
    }
    @GetMapping("/search/{studentId}")
    public ParentObservationDTO searchParentObservation(@PathVariable String studentId){
        return parentObservationService.searchParentObservation(studentId);    
    }
    @GetMapping("/all")
    public List<ParentObservationDTO> getAll(){
        return parentObservationService.getAll();
    }
}
