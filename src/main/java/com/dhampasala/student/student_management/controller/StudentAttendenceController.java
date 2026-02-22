package com.dhampasala.student.student_management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhampasala.student.student_management.model.dto.StudentAttendenceDTO;
import com.dhampasala.student.student_management.service.StudentAttendenceService;
@RestController
@RequestMapping("/studentattendence")
@CrossOrigin(origins = "*")
public class StudentAttendenceController {
          @Autowired
    private StudentAttendenceService studentAttendenceService;
    @PostMapping("/save")
    public void addStudentAttendance(@RequestBody StudentAttendenceDTO studentAttendenceDTO){
      studentAttendenceService.addStudentAttendance(studentAttendenceDTO);
    }
    @PutMapping("/update")
    public void updateStudentAttendance(@RequestBody StudentAttendenceDTO studentAttendenceDTO) {
      studentAttendenceService.updateStudentAttendance(studentAttendenceDTO);
    }
    @PutMapping("/delete/{studentId}")
    public void deleteStudentAttendance(@PathVariable String studentId){
      studentAttendenceService.deleteStudentAttendance(studentId);
    }
    @GetMapping("/search/{studentId}")
    public Optional<StudentAttendenceDTO> searchStudentAttendance(@PathVariable String studentId){
      return studentAttendenceService.searchStudentAttendance(studentId);
    }
    @GetMapping("/all")
    public List<StudentAttendenceDTO> getAll(){
        return studentAttendenceService.getAll();
    }
}
