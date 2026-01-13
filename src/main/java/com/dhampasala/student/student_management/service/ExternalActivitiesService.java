package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhampasala.student.student_management.model.dto.ExternalActivitiesDTO;
import com.dhampasala.student.student_management.model.entity.ExternalActivities;
import com.dhampasala.student.student_management.repository.ExternalActivitiesRepo;

public class ExternalActivitiesService {
        @Autowired
    private ExternalActivitiesRepo externalActivitiesRepo;
    private void addExternalActivity(ExternalActivitiesDTO externalActivitiesDTO){
        externalActivitiesRepo.addExternalActivity(new ExternalActivities(externalActivitiesDTO.getStudentId(),externalActivitiesDTO.isKatinaPerahara(),externalActivitiesDTO.isBuddhaPooja(),externalActivitiesDTO.isDanaya(),externalActivitiesDTO.isBakthiGeetha(),externalActivitiesDTO.isPaaliDay(),externalActivitiesDTO.isEnglishDay(),externalActivitiesDTO.isConcert(),externalActivitiesDTO.getOther(),externalActivitiesDTO.getMarks()));
    }
    private void updateExternalActivity(ExternalActivitiesDTO externalActivitiesDTO) {
        externalActivitiesRepo.updateExternalActivity(new ExternalActivities(externalActivitiesDTO.getStudentId(),externalActivitiesDTO.isKatinaPerahara(),externalActivitiesDTO.isBuddhaPooja(),externalActivitiesDTO.isDanaya(),externalActivitiesDTO.isBakthiGeetha(),externalActivitiesDTO.isPaaliDay(),externalActivitiesDTO.isEnglishDay(),externalActivitiesDTO.isConcert(),externalActivitiesDTO.getOther(),externalActivitiesDTO.getMarks()));
    }
    private void deleteExternalActivity(ExternalActivitiesDTO externalActivitiesDTO){
        externalActivitiesRepo.deleteExternalActivity(new ExternalActivities(externalActivitiesDTO.getStudentId(),externalActivitiesDTO.isKatinaPerahara(),externalActivitiesDTO.isBuddhaPooja(),externalActivitiesDTO.isDanaya(),externalActivitiesDTO.isBakthiGeetha(),externalActivitiesDTO.isPaaliDay(),externalActivitiesDTO.isEnglishDay(),externalActivitiesDTO.isConcert(),externalActivitiesDTO.getOther(),externalActivitiesDTO.getMarks()));
    }
    private ExternalActivitiesDTO searchExternalActivity(String studentId){
        ExternalActivities externalActivities=externalActivitiesRepo.searchExternalActivity(studentId);
        return new ExternalActivitiesDTO(externalActivities.getStudentId(),externalActivities.isKatinaPerahara(),externalActivities.isBuddhaPooja(),externalActivities.isDanaya(),externalActivities.isBakthiGeetha(),externalActivities.isPaaliDay(),externalActivities.isEnglishDay(),externalActivities.isConcert(),externalActivities.getOther(),externalActivities.getMarks());
    }
    private List<ExternalActivitiesDTO> getAll(){
        List<ExternalActivities>externalActivitiesArray=externalActivitiesRepo.getAll();
        List<ExternalActivitiesDTO>externalActivitiesDTOArray=new ArrayList<>();
        for(ExternalActivities externalActivities:externalActivitiesArray){
            externalActivitiesDTOArray.add(new ExternalActivitiesDTO(externalActivities.getStudentId(),externalActivities.isKatinaPerahara(),externalActivities.isBuddhaPooja(),externalActivities.isDanaya(),externalActivities.isBakthiGeetha(),externalActivities.isPaaliDay(),externalActivities.isEnglishDay(),externalActivities.isConcert(),externalActivities.getOther(),externalActivities.getMarks()));
        }
        return externalActivitiesDTOArray;
    }
}
