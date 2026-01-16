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

import com.dhampasala.student.student_management.model.dto.StudentMarksDTO;
import com.dhampasala.student.student_management.service.StudentMarksService;
@RestController
@RequestMapping("/studentmarks")
@CrossOrigin(origins = "*")
public class StudentMarksController {
      @Autowired
    private StudentMarksService studentMarksService;
    @PostMapping("/save")
    public void addStudentMarks(@RequestBody StudentMarksDTO studentMarksDTO){
      studentMarksService.addStudentMarks(studentMarksDTO);
    }
    @PostMapping("/update")
    public void updateStudentMarks(@RequestBody StudentMarksDTO studentMarksDTO) {
      studentMarksService.updateStudentMarks(studentMarksDTO);
    }
    @PostMapping("/delete")
    public void deleteStudentMarks(@RequestBody StudentMarksDTO studentMarksDTO){
      studentMarksService.deleteStudentMarks(studentMarksDTO);
    }
    @GetMapping("/search/{studentId}")
    public Optional<StudentMarksDTO> searchStudentMarks(@PathVariable String studentId){
      return studentMarksService.searchStudentMarks(studentId);
    }
    @GetMapping("/all")
    public List<StudentMarksDTO> getAll(){
        return studentMarksService.getAll();
    }
}
