package com.dhampasala.student.student_management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhampasala.student.student_management.model.dto.PersonalInfoDTO;
import com.dhampasala.student.student_management.service.PersonalInfoService;
@RestController
@RequestMapping("/personalinfo")
@CrossOrigin(origins = "*")
public class PersonalInfoController {
              @Autowired
    private PersonalInfoService personalInfoService;
    @PostMapping("/save")
    public void addPersonalInfo(@RequestBody PersonalInfoDTO personalInfoDTO){
      personalInfoService.addPersonalInfo(personalInfoDTO);
    }
    @PutMapping("/update/{studentId}")
    public void updatePersonalInfo(@RequestBody PersonalInfoDTO personalInfoDTO,@PathVariable String studentId) {
      personalInfoService.updatePersonalInfo(personalInfoDTO, studentId);
    }
    @DeleteMapping("/delete/{studentId}")
    public void deletePersonalInfo(@PathVariable String studentId){
      personalInfoService.deletePersonalInfo(studentId);
    }
    @GetMapping("/search/{studentId}")
    public Optional<PersonalInfoDTO> searchPersonalInfo(@PathVariable String studentId){
        return personalInfoService.searchPersonalInfo(studentId);
    }
    @GetMapping("/all")
    public List<PersonalInfoDTO> getAll(){
        return personalInfoService.getAll();
    }
}
