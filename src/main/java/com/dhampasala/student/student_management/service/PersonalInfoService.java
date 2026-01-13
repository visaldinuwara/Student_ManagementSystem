package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhampasala.student.student_management.model.dto.PersonalInfoDTO;
import com.dhampasala.student.student_management.model.entity.PersonalInfo;
import com.dhampasala.student.student_management.repository.PersonalInfoRepo;

public class PersonalInfoService {
            @Autowired
    private PersonalInfoRepo personalInfoRepo;
    private void addPersonalInfo(PersonalInfoDTO personalInfoDTO){
        String studentId=""; //generate student id
        personalInfoRepo.addPersonalInfo(new PersonalInfo(studentId,personalInfoDTO.getFullName(),personalInfoDTO.getBirthDate(),personalInfoDTO.getAddmissionDate(),personalInfoDTO.getGrade()));
    }
    private void updatePersonalInfo(PersonalInfoDTO personalInfoDTO,String id) {
        personalInfoRepo.updatePersonalInfo(new PersonalInfo(id,personalInfoDTO.getFullName(),personalInfoDTO.getBirthDate(),personalInfoDTO.getAddmissionDate(),personalInfoDTO.getGrade()));
    }
    private void deletePersonalInfo(PersonalInfoDTO personalInfoDTO,String id){
        personalInfoRepo.deletePersonalInfo(new PersonalInfo(id,personalInfoDTO.getFullName(),personalInfoDTO.getBirthDate(),personalInfoDTO.getAddmissionDate(),personalInfoDTO.getGrade()));
    }
    private PersonalInfoDTO searchPersonalInfo(String studentId){
        PersonalInfo personalInfo=personalInfoRepo.searchPersonalInfo(studentId);
        return new PersonalInfoDTO(personalInfo.getFullName(),personalInfo.getBirthDate(),personalInfo.getAddmissionDate(),personalInfo.getGrade());
    }
    private List<PersonalInfoDTO> getAll(){
        List<PersonalInfo>personalInfoArray=personalInfoRepo.getAll();
        List<PersonalInfoDTO>personalInfoDTOArray=new ArrayList<>();
        for(PersonalInfo personalInfo:personalInfoArray){
            personalInfoDTOArray.add(new PersonalInfoDTO(personalInfo.getFullName(),personalInfo.getBirthDate(),personalInfo.getAddmissionDate(),personalInfo.getGrade()));
        }
        return personalInfoDTOArray;
    }
}
