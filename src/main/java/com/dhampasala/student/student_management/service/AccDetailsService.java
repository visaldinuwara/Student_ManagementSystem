package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhampasala.student.student_management.model.dto.AccDetailsDTO;
import com.dhampasala.student.student_management.model.entity.AccDetails;
import com.dhampasala.student.student_management.repository.AccDetailsRepo;

public class AccDetailsService {
    @Autowired
    private AccDetailsRepo accDetailsRepo;
    private void addAccDetails(AccDetailsDTO accDetails){
        accDetailsRepo.addAccDetails(new AccDetails(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
    }
    private void updateAccDetails(AccDetailsDTO accDetails) {
        accDetailsRepo.updateAccDetails(new AccDetails(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
    }
    private void deleteAccDetails(AccDetailsDTO accDetails){
        accDetailsRepo.deleteAccDetails(new AccDetails(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
    }
    private AccDetailsDTO searchAccDetails(String userName){
        AccDetails accDetails=accDetailsRepo.searchAccDetails(userName);
        return new AccDetailsDTO(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole());
    }
    private List<AccDetailsDTO> getAll(){
        List<AccDetails>accDetailsArray=accDetailsRepo.getAll();
        List<AccDetailsDTO>accDetailsDTOArray=new ArrayList<>();
        for(AccDetails accDetails:accDetailsArray){
            accDetailsDTOArray.add(new AccDetailsDTO(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
        }
        return accDetailsDTOArray;
    }
}
