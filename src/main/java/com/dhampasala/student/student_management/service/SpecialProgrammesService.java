package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhampasala.student.student_management.model.dto.SpecialProgrammesDTO;
import com.dhampasala.student.student_management.model.entity.SpecialProgrammes;
import com.dhampasala.student.student_management.repository.SpecialProgrammesRepo;

public class SpecialProgrammesService {
      @Autowired
    private SpecialProgrammesRepo specialProgrammesRepo;
    private void addSpecialProgramme(SpecialProgrammesDTO specialProgrammesDTO){
        specialProgrammesRepo.addSpecialProgramme(new SpecialProgrammes(specialProgrammesDTO.getStudentID(),specialProgrammesDTO.getMonth(),specialProgrammesDTO.getProgrammeName(),specialProgrammesDTO.getMarks()));
    }
    private void updateSpecialProgramme(SpecialProgrammesDTO specialProgrammesDTO) {
        specialProgrammesRepo.updateSpecialProgramme(new SpecialProgrammes(specialProgrammesDTO.getStudentID(),specialProgrammesDTO.getMonth(),specialProgrammesDTO.getProgrammeName(),specialProgrammesDTO.getMarks()));
    }
    private void deleteSpecialProgramme(SpecialProgrammesDTO specialProgrammesDTO){
        specialProgrammesRepo.deleteSpecialProgramme(new SpecialProgrammes(specialProgrammesDTO.getStudentID(),specialProgrammesDTO.getMonth(),specialProgrammesDTO.getProgrammeName(),specialProgrammesDTO.getMarks()));
    }
    private SpecialProgrammesDTO searchSpecialProgramme(String studentId){
        SpecialProgrammes specialProgrammes=specialProgrammesRepo.searchSpecialProgramme(studentId);
        return new SpecialProgrammesDTO(specialProgrammes.getStudentID(),specialProgrammes.getMonth(),specialProgrammes.getProgrammeName(),specialProgrammes.getMarks());
    }
    private List<SpecialProgrammesDTO> getAll(){
        List<SpecialProgrammes>specialProgrammesArray=specialProgrammesRepo.getAll();
        List<SpecialProgrammesDTO>specialProgrammesDTOArray=new ArrayList<>();
        for(SpecialProgrammes specialProgrammes:specialProgrammesArray){
            specialProgrammesDTOArray.add(new SpecialProgrammesDTO(specialProgrammes.getStudentID(),specialProgrammes.getMonth(),specialProgrammes.getProgrammeName(),specialProgrammes.getMarks()));
        }
        return specialProgrammesDTOArray;
    }
}
