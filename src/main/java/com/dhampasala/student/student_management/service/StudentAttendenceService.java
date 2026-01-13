package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhampasala.student.student_management.model.dto.StudentAttendenceDTO;
import com.dhampasala.student.student_management.model.entity.StudentAttendence;
import com.dhampasala.student.student_management.repository.StudentAttendenceRepo;

public class StudentAttendenceService {
        @Autowired
    private StudentAttendenceRepo studentAttendenceRepo;
    private void addStudentAttendance(StudentAttendenceDTO studentAttendenceDTO){
        studentAttendenceRepo.addStudentAttendance(new StudentAttendence(studentAttendenceDTO.getStudentId(),studentAttendenceDTO.getYear(),studentAttendenceDTO.getMonth(),studentAttendenceDTO.getDaysPresent()));
    }
    private void updateStudentAttendance(StudentAttendenceDTO studentAttendenceDTO) {
        studentAttendenceRepo.updateStudentAttendance(new StudentAttendence(studentAttendenceDTO.getStudentId(),studentAttendenceDTO.getYear(),studentAttendenceDTO.getMonth(),studentAttendenceDTO.getDaysPresent()));
    }
    private void deleteStudentAttendance(StudentAttendenceDTO studentAttendenceDTO){
        studentAttendenceRepo.deleteStudentAttendance(new StudentAttendence(studentAttendenceDTO.getStudentId(),studentAttendenceDTO.getYear(),studentAttendenceDTO.getMonth(),studentAttendenceDTO.getDaysPresent()));
    }
    private StudentAttendenceDTO searchStudentAttendance(String studentId){
        StudentAttendence studentAttendence=studentAttendenceRepo.searchStudentAttendance(studentId);
        return new StudentAttendenceDTO(studentAttendence.getStudentId(),studentAttendence.getYear(),studentAttendence.getMonth(),studentAttendence.getDaysPresent());
    }
    private List<StudentAttendenceDTO> getAll(){
        List<StudentAttendence> studentAttendenceArray=studentAttendenceRepo.getAll();
        List<StudentAttendenceDTO> studentAttendenceDTOArray=new ArrayList<>();
        for(StudentAttendence studentAttendence:studentAttendenceArray){
            studentAttendenceDTOArray.add(new StudentAttendenceDTO(studentAttendence.getStudentId(),studentAttendence.getYear(),studentAttendence.getMonth(),studentAttendence.getDaysPresent()));
        }
        return studentAttendenceDTOArray;
    }
}
