package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.StudentAttendenceDTO;
import com.dhampasala.student.student_management.model.entity.StudentAttendence;
import com.dhampasala.student.student_management.repository.StudentAttendenceRepo;
@Service
public class StudentAttendenceService {
        @Autowired
    private StudentAttendenceRepo studentAttendenceRepo;
    public void addStudentAttendance(StudentAttendenceDTO studentAttendenceDTO){
        studentAttendenceRepo.save(new StudentAttendence(studentAttendenceDTO.getStudentId(),studentAttendenceDTO.getYear(),studentAttendenceDTO.getMonth(),studentAttendenceDTO.getDaysPresent()));
    }
    public void updateStudentAttendance(StudentAttendenceDTO studentAttendenceDTO) {
        studentAttendenceRepo.save(new StudentAttendence(studentAttendenceDTO.getStudentId(),studentAttendenceDTO.getYear(),studentAttendenceDTO.getMonth(),studentAttendenceDTO.getDaysPresent()));
    }
    public void deleteStudentAttendance(StudentAttendenceDTO studentAttendenceDTO){
        studentAttendenceRepo.delete(new StudentAttendence(studentAttendenceDTO.getStudentId(),studentAttendenceDTO.getYear(),studentAttendenceDTO.getMonth(),studentAttendenceDTO.getDaysPresent()));
    }
    public Optional<StudentAttendenceDTO> searchStudentAttendance(String studentId){
        return studentAttendenceRepo.findById(studentId).map(dto -> new StudentAttendenceDTO(dto.getStudentId(),dto.getYear(),dto.getMonth(),dto.getDaysPresent()));
    }
    public List<StudentAttendenceDTO> getAll(){
        List<StudentAttendence> studentAttendenceArray=studentAttendenceRepo.findAll();
        List<StudentAttendenceDTO> studentAttendenceDTOArray=new ArrayList<>();
        for(StudentAttendence studentAttendence:studentAttendenceArray){
            studentAttendenceDTOArray.add(new StudentAttendenceDTO(studentAttendence.getStudentId(),studentAttendence.getYear(),studentAttendence.getMonth(),studentAttendence.getDaysPresent()));
        }
        return studentAttendenceDTOArray;
    }
}
