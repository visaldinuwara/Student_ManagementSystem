package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.SpecialProgrammesDTO;
import com.dhampasala.student.student_management.model.entity.SpecialProgrammes;
import com.dhampasala.student.student_management.repository.SpecialProgrammesRepo;
@Service
public class SpecialProgrammesService {
      @Autowired
    private SpecialProgrammesRepo specialProgrammesRepo;
    public void addSpecialProgramme(SpecialProgrammesDTO specialProgrammesDTO){
        specialProgrammesRepo.save(new SpecialProgrammes(specialProgrammesDTO.getStudentID(),specialProgrammesDTO.getMonth(),specialProgrammesDTO.getProgrammeName(),specialProgrammesDTO.getMarks()));
    }
    public void updateSpecialProgramme(SpecialProgrammesDTO specialProgrammesDTO) {
        specialProgrammesRepo.save(new SpecialProgrammes(specialProgrammesDTO.getStudentID(),specialProgrammesDTO.getMonth(),specialProgrammesDTO.getProgrammeName(),specialProgrammesDTO.getMarks()));
    }
    public void deleteSpecialProgramme(SpecialProgrammesDTO specialProgrammesDTO){
        specialProgrammesRepo.delete(new SpecialProgrammes(specialProgrammesDTO.getStudentID(),specialProgrammesDTO.getMonth(),specialProgrammesDTO.getProgrammeName(),specialProgrammesDTO.getMarks()));
    }
    public Optional<SpecialProgrammesDTO> searchSpecialProgramme(String studentId){
        return specialProgrammesRepo.findById(studentId).map(dto -> new SpecialProgrammesDTO(dto.getStudentID(),dto.getMonth(),dto.getProgrammeName(),dto.getMarks()));
    }
    public List<SpecialProgrammesDTO> getAll(){
        List<SpecialProgrammes>specialProgrammesArray=specialProgrammesRepo.findAll();
        List<SpecialProgrammesDTO>specialProgrammesDTOArray=new ArrayList<>();
        for(SpecialProgrammes specialProgrammes:specialProgrammesArray){
            specialProgrammesDTOArray.add(new SpecialProgrammesDTO(specialProgrammes.getStudentID(),specialProgrammes.getMonth(),specialProgrammes.getProgrammeName(),specialProgrammes.getMarks()));
        }
        return specialProgrammesDTOArray;
    }
}
