package com.dhampasala.student.student_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhampasala.student.student_management.model.dto.StudentAttendenceDTO;
import com.dhampasala.student.student_management.service.StudentAttendenceService;
@RestController
@RequestMapping("/studentattendence")
public class StudentAttendenceController {
          @Autowired
    private StudentAttendenceService studentAttendenceService;
    @PostMapping("/save")
    public void addStudentAttendance(@RequestBody StudentAttendenceDTO studentAttendenceDTO){
      studentAttendenceService.addStudentAttendance(studentAttendenceDTO);
    }
    @PostMapping("/update")
    public void updateStudentAttendance(@RequestBody StudentAttendenceDTO studentAttendenceDTO) {
      studentAttendenceService.updateStudentAttendance(studentAttendenceDTO);
    }
    @PostMapping("/delete")
    public void deleteStudentAttendance(@RequestBody StudentAttendenceDTO studentAttendenceDTO){
      studentAttendenceService.deleteStudentAttendance(studentAttendenceDTO);
    }
    @GetMapping("/search/{studentId}")
    public StudentAttendenceDTO searchStudentAttendance(String studentId){
      return studentAttendenceService.searchStudentAttendance(studentId);
    }
    @GetMapping("/all")
    public List<StudentAttendenceDTO> getAll(){
        return studentAttendenceService.getAll();
    }
}
