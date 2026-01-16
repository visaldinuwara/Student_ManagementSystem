package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.ExternalActivitiesDTO;
import com.dhampasala.student.student_management.model.entity.ExternalActivities;
import com.dhampasala.student.student_management.repository.ExternalActivitiesRepo;
@Service
public class ExternalActivitiesService {
        @Autowired
    private ExternalActivitiesRepo externalActivitiesRepo;
    public void addExternalActivity(ExternalActivitiesDTO externalActivitiesDTO){
        externalActivitiesRepo.save(new ExternalActivities(externalActivitiesDTO.getStudentId(),externalActivitiesDTO.isKatinaPerahara(),externalActivitiesDTO.isBuddhaPooja(),externalActivitiesDTO.isDanaya(),externalActivitiesDTO.isBakthiGeetha(),externalActivitiesDTO.isPaaliDay(),externalActivitiesDTO.isEnglishDay(),externalActivitiesDTO.isConcert(),externalActivitiesDTO.getOther(),externalActivitiesDTO.getMarks()));
    }
    public void updateExternalActivity(ExternalActivitiesDTO externalActivitiesDTO) {
        externalActivitiesRepo.save(new ExternalActivities(externalActivitiesDTO.getStudentId(),externalActivitiesDTO.isKatinaPerahara(),externalActivitiesDTO.isBuddhaPooja(),externalActivitiesDTO.isDanaya(),externalActivitiesDTO.isBakthiGeetha(),externalActivitiesDTO.isPaaliDay(),externalActivitiesDTO.isEnglishDay(),externalActivitiesDTO.isConcert(),externalActivitiesDTO.getOther(),externalActivitiesDTO.getMarks()));
    }
    public void deleteExternalActivity(ExternalActivitiesDTO externalActivitiesDTO){
        externalActivitiesRepo.delete(new ExternalActivities(externalActivitiesDTO.getStudentId(),externalActivitiesDTO.isKatinaPerahara(),externalActivitiesDTO.isBuddhaPooja(),externalActivitiesDTO.isDanaya(),externalActivitiesDTO.isBakthiGeetha(),externalActivitiesDTO.isPaaliDay(),externalActivitiesDTO.isEnglishDay(),externalActivitiesDTO.isConcert(),externalActivitiesDTO.getOther(),externalActivitiesDTO.getMarks()));
    }
    public Optional<ExternalActivitiesDTO> searchExternalActivity(String studentId){
        return externalActivitiesRepo.findById(studentId).map(dto -> new ExternalActivitiesDTO(
            dto.getStudentId(),
            dto.isKatinaPerahara(),
            dto.isBuddhaPooja(),
            dto.isDanaya(),
            dto.isBakthiGeetha(),
            dto.isPaaliDay(),
            dto.isEnglishDay(),
            dto.isConcert(),
            dto.getOther(),
            dto.getMarks()
        ));
    }
        
    public List<ExternalActivitiesDTO> getAll(){
        List<ExternalActivities>externalActivitiesArray=externalActivitiesRepo.findAll();
        List<ExternalActivitiesDTO>externalActivitiesDTOArray=new ArrayList<>();
        for(ExternalActivities externalActivities:externalActivitiesArray){
            externalActivitiesDTOArray.add(new ExternalActivitiesDTO(externalActivities.getStudentId(),externalActivities.isKatinaPerahara(),externalActivities.isBuddhaPooja(),externalActivities.isDanaya(),externalActivities.isBakthiGeetha(),externalActivities.isPaaliDay(),externalActivities.isEnglishDay(),externalActivities.isConcert(),externalActivities.getOther(),externalActivities.getMarks()));
        }
        return externalActivitiesDTOArray;
    }
}
