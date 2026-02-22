package com.dhampasala.student.student_management.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.PersonalInfoDTO;
import com.dhampasala.student.student_management.model.entity.PersonalInfo;
import com.dhampasala.student.student_management.repository.PersonalInfoRepo;
@Service
public class PersonalInfoService {
            @Autowired
    private PersonalInfoRepo personalInfoRepo;
    public void addPersonalInfo(PersonalInfoDTO personalInfoDTO){    
        personalInfoRepo.save(new PersonalInfo(idGenerater(personalInfoDTO.getMedium()),personalInfoDTO.getFullName(),personalInfoDTO.getBirthDate(),personalInfoDTO.getAddmissionDate(),personalInfoDTO.getGrade(),personalInfoDTO.getPhoneNo(),personalInfoDTO.getWhatsAppNo(),personalInfoDTO.getAddress(),personalInfoDTO.getGuardianName(),personalInfoDTO.getGuardianNIC(),personalInfoDTO.getOccupation(),personalInfoDTO.getFutureGoal()));
    }
    public void updatePersonalInfo(PersonalInfoDTO personalInfoDTO,String id) {
        personalInfoRepo.save(new PersonalInfo(id,personalInfoDTO.getFullName(),personalInfoDTO.getBirthDate(),personalInfoDTO.getAddmissionDate(),personalInfoDTO.getGrade(),personalInfoDTO.getPhoneNo(),personalInfoDTO.getWhatsAppNo(),personalInfoDTO.getAddress(),personalInfoDTO.getGuardianName(),personalInfoDTO.getGuardianNIC(),personalInfoDTO.getOccupation(),personalInfoDTO.getFutureGoal()));
    }
    public void deletePersonalInfo(String id){
        personalInfoRepo.deleteById(id);
    }
    public Optional<PersonalInfoDTO> searchPersonalInfo(String studentId){
        return personalInfoRepo.findById(studentId).map(dto -> new PersonalInfoDTO(dto.getFullName(),dto.getBirthDate(),dto.getAddmissionDate(),dto.getGrade(),dto.getPhoneNo(),dto.getWhatsAppNo(),dto.getAddress(),dto.getGuardianName(),dto.getGuardianNIC(),dto.getOccupation(),dto.getFutureGoal(),false));
    }
    public List<PersonalInfoDTO> getAll(){
        List<PersonalInfo>personalInfoArray=personalInfoRepo.findAll();
        List<PersonalInfoDTO>personalInfoDTOArray=new ArrayList<>();
        for(PersonalInfo personalInfo:personalInfoArray){
            personalInfoDTOArray.add(new PersonalInfoDTO(personalInfo.getFullName(),personalInfo.getBirthDate(),personalInfo.getAddmissionDate(),personalInfo.getGrade(),personalInfo.getPhoneNo(),personalInfo.getWhatsAppNo(),personalInfo.getAddress(),personalInfo.getGuardianName(),personalInfo.getGuardianNIC(),personalInfo.getOccupation(),personalInfo.getFutureGoal(),false));
        }
        return personalInfoDTOArray;
    }

private String idGenerater(boolean medium) {
    String lastId = personalInfoRepo.findLastStudentId();
    
    String prefix = (medium) ? "SM" : "EM";
    String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM"));
    
    if (lastId == null || lastId.isEmpty()) {
        return prefix + datePart + "001";
    }

    String lastThree = lastId.substring(lastId.length() - 3);
    int nextNumber = Integer.parseInt(lastThree) + 1;

    return prefix + datePart + String.format("%03d", nextNumber);
}
    
}
