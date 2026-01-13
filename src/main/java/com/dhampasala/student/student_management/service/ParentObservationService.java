package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhampasala.student.student_management.model.dto.ParentObservationDTO;
import com.dhampasala.student.student_management.model.entity.ParentObservation;
import com.dhampasala.student.student_management.repository.ParentObservationRepo;

public class ParentObservationService {
          @Autowired
    private ParentObservationRepo parentObservationRepo;
    private void addParentObservation(ParentObservationDTO parentObservationDTO){
        parentObservationRepo.addParentObservation(new ParentObservation(parentObservationDTO.getStudentId(),parentObservationDTO.getFirstTerm(),parentObservationDTO.getSecondTerm(),parentObservationDTO.getThirdTerm()));
    }
    private void updateParentObservation(ParentObservationDTO parentObservationDTO) {
        parentObservationRepo.updateParentObservation(new ParentObservation(parentObservationDTO.getStudentId(),parentObservationDTO.getFirstTerm(),parentObservationDTO.getSecondTerm(),parentObservationDTO.getThirdTerm()));
    }
    private void deleteParentObservation(ParentObservationDTO parentObservationDTO){
        parentObservationRepo.deleteParentObservation(new ParentObservation(parentObservationDTO.getStudentId(),parentObservationDTO.getFirstTerm(),parentObservationDTO.getSecondTerm(),parentObservationDTO.getThirdTerm()));
    }
    private ParentObservationDTO searchParentObservation(String studentId){
        ParentObservation parentObservation=parentObservationRepo.searchParentObservation(studentId);
        return new ParentObservationDTO(parentObservation.getStudentId(),parentObservation.getFirstTerm(),parentObservation.getSecondTerm(),parentObservation.getThirdTerm());
    }
    private List<ParentObservationDTO> getAll(){
        List<ParentObservation>parentObservationArray=parentObservationRepo.getAll();
        List<ParentObservationDTO>parentObservationDTOArray=new ArrayList<>();
        for(ParentObservation parentObservation:parentObservationArray){
            parentObservationDTOArray.add(new ParentObservationDTO(parentObservation.getStudentId(),parentObservation.getFirstTerm(),parentObservation.getSecondTerm(),parentObservation.getThirdTerm()));
        }
        return parentObservationDTOArray;
    }
}
