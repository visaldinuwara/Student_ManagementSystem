package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.AccDetailsDTO;
import com.dhampasala.student.student_management.model.entity.AccDetails;
import com.dhampasala.student.student_management.repository.AccDetailsRepo;
@Service
public class AccDetailsService {
    @Autowired
    private AccDetailsRepo accDetailsRepo;
    public void addAccDetails(AccDetailsDTO accDetails){
        accDetailsRepo.addAccDetails(new AccDetails(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
    }
    public void updateAccDetails(AccDetailsDTO accDetails) {
        accDetailsRepo.updateAccDetails(new AccDetails(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
    }
    public void deleteAccDetails(AccDetailsDTO accDetails){
        accDetailsRepo.deleteAccDetails(new AccDetails(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
    }
    public AccDetailsDTO searchAccDetails(String userName){
        AccDetails accDetails=accDetailsRepo.searchAccDetails(userName);
        return new AccDetailsDTO(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole());
    }
    public List<AccDetailsDTO> getAll(){
        List<AccDetails>accDetailsArray=accDetailsRepo.getAll();
        List<AccDetailsDTO>accDetailsDTOArray=new ArrayList<>();
        for(AccDetails accDetails:accDetailsArray){
            accDetailsDTOArray.add(new AccDetailsDTO(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
        }
        return accDetailsDTOArray;
    }
}
