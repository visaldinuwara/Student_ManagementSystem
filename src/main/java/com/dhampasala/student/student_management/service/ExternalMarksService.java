package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhampasala.student.student_management.model.dto.ExternalMarksDTO;
import com.dhampasala.student.student_management.model.entity.ExternalMarks;
import com.dhampasala.student.student_management.repository.ExternalMarksRepo;

public class ExternalMarksService {
      @Autowired
    private ExternalMarksRepo externalMarksRepo;
    private void addExternalMarks(ExternalMarksDTO externalMarksDTO){
        externalMarksRepo.addExternalMark(new ExternalMarks(externalMarksDTO.getStudentId(),externalMarksDTO.getFirstTerm(),externalMarksDTO.getSecondTerm(),externalMarksDTO.getThirdTerm()));
    }
    private void updateExternalMarks(ExternalMarksDTO externalMarksDTO) {
        externalMarksRepo.updateExternalMark(new ExternalMarks(externalMarksDTO.getStudentId(),externalMarksDTO.getFirstTerm(),externalMarksDTO.getSecondTerm(),externalMarksDTO.getThirdTerm()));
    }
    private void deleteExternalMarks(ExternalMarksDTO externalMarksDTO){
        externalMarksRepo.deleteExternalMark(new ExternalMarks(externalMarksDTO.getStudentId(),externalMarksDTO.getFirstTerm(),externalMarksDTO.getSecondTerm(),externalMarksDTO.getThirdTerm()));
    }
    private ExternalMarksDTO searchExternalMarks(String studentId){
        ExternalMarks externalMarks=externalMarksRepo.searchExternalMarks(studentId);
        return new ExternalMarksDTO(externalMarks.getStudentId(),externalMarks.getFirstTerm(),externalMarks.getSecondTerm(),externalMarks.getThirdTerm());
    }
    private List<ExternalMarksDTO> getAll(){
        List<ExternalMarks>externalMarksArray=externalMarksRepo.getAll();
        List<ExternalMarksDTO>externalMarksDTOArray=new ArrayList<>();
        for(ExternalMarks externalMarks:externalMarksArray){
            externalMarksDTOArray.add(new ExternalMarksDTO(externalMarks.getStudentId(),externalMarks.getFirstTerm(),externalMarks.getSecondTerm(),externalMarks.getThirdTerm()));
        }
        return externalMarksDTOArray;
    }
}
