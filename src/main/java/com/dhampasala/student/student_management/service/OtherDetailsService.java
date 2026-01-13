package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhampasala.student.student_management.model.dto.OtherDetailsDTO;
import com.dhampasala.student.student_management.model.entity.OtherDetails;
import com.dhampasala.student.student_management.repository.OtherDetailsRepo;

public class OtherDetailsService {
        @Autowired
    private OtherDetailsRepo otherDetailsRepo;
    private void addOtherDetails(OtherDetailsDTO otherDetailsDTO){
        otherDetailsRepo.addOtherDetail(new OtherDetails(otherDetailsDTO.getStudentId(),otherDetailsDTO.getGuardianName(),otherDetailsDTO.getGuardianNIC(),otherDetailsDTO.getOccupation(),otherDetailsDTO.getFutureGoal()));
    }
    private void updateOtherDetails(OtherDetailsDTO otherDetailsDTO) {
        otherDetailsRepo.updateOtherDetail(new OtherDetails(otherDetailsDTO.getStudentId(),otherDetailsDTO.getGuardianName(),otherDetailsDTO.getGuardianNIC(),otherDetailsDTO.getOccupation(),otherDetailsDTO.getFutureGoal()));
    }
    private void deleteOtherDetails(OtherDetailsDTO otherDetailsDTO){
        otherDetailsRepo.deleteOtherDetail(new OtherDetails(otherDetailsDTO.getStudentId(),otherDetailsDTO.getGuardianName(),otherDetailsDTO.getGuardianNIC(),otherDetailsDTO.getOccupation(),otherDetailsDTO.getFutureGoal()));
    }
    private OtherDetailsDTO searchOtherDetails(String studentId){
        OtherDetails otherDetails=otherDetailsRepo.searchOtherDetail(studentId);
        return new OtherDetailsDTO(otherDetails.getStudentId(),otherDetails.getGuardianName(),otherDetails.getGuardianNIC(),otherDetails.getOccupation(),otherDetails.getFutureGoal());
    }
    private List<OtherDetailsDTO> getAll(){
        List<OtherDetails>otherDetailsArray=otherDetailsRepo.getAll();
        List<OtherDetailsDTO>otherDetailsDTOArray=new ArrayList<>();
        for(OtherDetails otherDetails:otherDetailsArray){
            otherDetailsDTOArray.add(new OtherDetailsDTO(otherDetails.getStudentId(),otherDetails.getGuardianName(),otherDetails.getGuardianNIC(),otherDetails.getOccupation(),otherDetails.getFutureGoal()));
        }
        return otherDetailsDTOArray;
    }
}
