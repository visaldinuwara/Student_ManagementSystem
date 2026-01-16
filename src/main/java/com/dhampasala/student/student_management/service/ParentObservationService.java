package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.ParentObservationDTO;
import com.dhampasala.student.student_management.model.entity.ParentObservation;
import com.dhampasala.student.student_management.repository.ParentObservationRepo;
@Service
public class ParentObservationService {
          @Autowired
    private ParentObservationRepo parentObservationRepo;
    public void addParentObservation(ParentObservationDTO parentObservationDTO){
        parentObservationRepo.save(new ParentObservation(parentObservationDTO.getStudentId(),parentObservationDTO.getFirstTerm(),parentObservationDTO.getSecondTerm(),parentObservationDTO.getThirdTerm()));
    }
    public void updateParentObservation(ParentObservationDTO parentObservationDTO) {
        parentObservationRepo.save(new ParentObservation(parentObservationDTO.getStudentId(),parentObservationDTO.getFirstTerm(),parentObservationDTO.getSecondTerm(),parentObservationDTO.getThirdTerm()));
    }
    public void deleteParentObservation(ParentObservationDTO parentObservationDTO){
        parentObservationRepo.delete(new ParentObservation(parentObservationDTO.getStudentId(),parentObservationDTO.getFirstTerm(),parentObservationDTO.getSecondTerm(),parentObservationDTO.getThirdTerm()));
    }
    public Optional<ParentObservationDTO> searchParentObservation(String studentId){
        return parentObservationRepo.findById(studentId).map(dto -> new ParentObservationDTO(dto.getStudentId(),dto.getFirstTerm(),dto.getSecondTerm(),dto.getThirdTerm()));
    }
    public List<ParentObservationDTO> getAll(){
        List<ParentObservation>parentObservationArray=parentObservationRepo.findAll();
        List<ParentObservationDTO>parentObservationDTOArray=new ArrayList<>();
        for(ParentObservation parentObservation:parentObservationArray){
            parentObservationDTOArray.add(new ParentObservationDTO(parentObservation.getStudentId(),parentObservation.getFirstTerm(),parentObservation.getSecondTerm(),parentObservation.getThirdTerm()));
        }
        return parentObservationDTOArray;
    }
}
