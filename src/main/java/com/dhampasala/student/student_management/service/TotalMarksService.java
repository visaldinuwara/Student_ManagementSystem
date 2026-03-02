package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.TotalMarksDTO;
import com.dhampasala.student.student_management.model.entity.TotalMarks;
import com.dhampasala.student.student_management.repository.TotalMarksRepo;
@Service
public class TotalMarksService {
      @Autowired
    private TotalMarksRepo totalMarksRepo;
    public void addTotalMarks(TotalMarksDTO totalMarksDTO){
        totalMarksRepo.save(new TotalMarks(totalMarksDTO.getStudentId(),totalMarksDTO.getStudentName(),totalMarksDTO.getTotalMarks()));
    }
    public void updateTotalmarks(TotalMarksDTO totalMarksDTO) {
        totalMarksRepo.save(new TotalMarks(totalMarksDTO.getStudentId(),totalMarksDTO.getStudentName(),totalMarksDTO.getTotalMarks()));
    }
    public void deleteTotalMarks(String studentId){
        totalMarksRepo.deleteById(studentId);
    }
    public Optional<TotalMarksDTO> searchTotalMarks(String studentId){
        return totalMarksRepo.findById(studentId).map(dto -> new TotalMarksDTO(dto.getStudentId(),dto.getStudentName(),dto.getTotalMarks()));
    }
    public List<TotalMarksDTO> getAll(){
        List<TotalMarks> totalMarksArray=totalMarksRepo.findAll();
        List<TotalMarksDTO> totalMarksDTOArray=new ArrayList<>();
        for(TotalMarks totalMarks:totalMarksArray){
            totalMarksDTOArray.add(new TotalMarksDTO(totalMarks.getStudentId(),totalMarks.getStudentName(),totalMarks.getTotalMarks()));
        }
        return totalMarksDTOArray;
    }
      public void deleteMultipleRecords(List<String> studentIds) {
        if (studentIds != null && !studentIds.isEmpty()) {
              totalMarksRepo.deleteAllById(studentIds);
        }
    }
  }
