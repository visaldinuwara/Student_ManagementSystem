package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.ExternalMarksDTO;
import com.dhampasala.student.student_management.model.entity.ExternalMarks;
import com.dhampasala.student.student_management.repository.ExternalMarksRepo;
@Service
public class ExternalMarksService {
      @Autowired
    private ExternalMarksRepo externalMarksRepo;
    public void addExternalMarks(ExternalMarksDTO externalMarksDTO){
        externalMarksRepo.save(new ExternalMarks(externalMarksDTO.getStudentId(),externalMarksDTO.getFirstTerm(),externalMarksDTO.getSecondTerm(),externalMarksDTO.getThirdTerm()));
    }
    public void updateExternalMarks(ExternalMarksDTO externalMarksDTO) {
        externalMarksRepo.save(new ExternalMarks(externalMarksDTO.getStudentId(),externalMarksDTO.getFirstTerm(),externalMarksDTO.getSecondTerm(),externalMarksDTO.getThirdTerm()));
    }
    public void deleteExternalMarks(ExternalMarksDTO externalMarksDTO){
        externalMarksRepo.delete(new ExternalMarks(externalMarksDTO.getStudentId(),externalMarksDTO.getFirstTerm(),externalMarksDTO.getSecondTerm(),externalMarksDTO.getThirdTerm()));
    }
    public Optional<ExternalMarksDTO> searchExternalMarks(String studentId){
        return externalMarksRepo.findById(studentId).map(dto -> new ExternalMarksDTO(
            dto.getStudentId(),
            dto.getFirstTerm(),
            dto.getSecondTerm(),
            dto.getThirdTerm()
        ));
    }
    public List<ExternalMarksDTO> getAll(){
        List<ExternalMarks>externalMarksArray=externalMarksRepo.findAll();
        List<ExternalMarksDTO>externalMarksDTOArray=new ArrayList<>();
        for(ExternalMarks externalMarks:externalMarksArray){
            externalMarksDTOArray.add(new ExternalMarksDTO(externalMarks.getStudentId(),externalMarks.getFirstTerm(),externalMarks.getSecondTerm(),externalMarks.getThirdTerm()));
        }
        return externalMarksDTOArray;
    }
}
