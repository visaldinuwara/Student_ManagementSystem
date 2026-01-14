package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

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
        externalMarksRepo.addExternalMark(new ExternalMarks(externalMarksDTO.getStudentId(),externalMarksDTO.getFirstTerm(),externalMarksDTO.getSecondTerm(),externalMarksDTO.getThirdTerm()));
    }
    public void updateExternalMarks(ExternalMarksDTO externalMarksDTO) {
        externalMarksRepo.updateExternalMark(new ExternalMarks(externalMarksDTO.getStudentId(),externalMarksDTO.getFirstTerm(),externalMarksDTO.getSecondTerm(),externalMarksDTO.getThirdTerm()));
    }
    public void deleteExternalMarks(ExternalMarksDTO externalMarksDTO){
        externalMarksRepo.deleteExternalMark(new ExternalMarks(externalMarksDTO.getStudentId(),externalMarksDTO.getFirstTerm(),externalMarksDTO.getSecondTerm(),externalMarksDTO.getThirdTerm()));
    }
    public ExternalMarksDTO searchExternalMarks(String studentId){
        ExternalMarks externalMarks=externalMarksRepo.searchExternalMarks(studentId);
        return new ExternalMarksDTO(externalMarks.getStudentId(),externalMarks.getFirstTerm(),externalMarks.getSecondTerm(),externalMarks.getThirdTerm());
    }
    public List<ExternalMarksDTO> getAll(){
        List<ExternalMarks>externalMarksArray=externalMarksRepo.getAll();
        List<ExternalMarksDTO>externalMarksDTOArray=new ArrayList<>();
        for(ExternalMarks externalMarks:externalMarksArray){
            externalMarksDTOArray.add(new ExternalMarksDTO(externalMarks.getStudentId(),externalMarks.getFirstTerm(),externalMarks.getSecondTerm(),externalMarks.getThirdTerm()));
        }
        return externalMarksDTOArray;
    }
}
