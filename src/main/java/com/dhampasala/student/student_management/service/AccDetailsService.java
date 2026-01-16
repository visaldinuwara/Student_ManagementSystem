package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        accDetailsRepo.save(new AccDetails(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
    }
    public void updateAccDetails(AccDetailsDTO accDetails) {
        accDetailsRepo.save(new AccDetails(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
    }
    public void deleteAccDetails(AccDetailsDTO accDetails){
        accDetailsRepo.delete(new AccDetails(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
    }
    public Optional<AccDetailsDTO> searchAccDetails(String userName){
    return accDetailsRepo.findById(userName)
            .map(entity -> new AccDetailsDTO(
                entity.getUserName(),
                entity.getRole(),
                entity.getPassword()  // ← no password!
            ));
}
    public List<AccDetailsDTO> getAll(){
        List<AccDetails>accDetailsArray=accDetailsRepo.findAll();
        List<AccDetailsDTO>accDetailsDTOArray=new ArrayList<>();
        for(AccDetails accDetails:accDetailsArray){
            accDetailsDTOArray.add(new AccDetailsDTO(accDetails.getUserName(),accDetails.getPassword(),accDetails.getRole()));
        }
        return accDetailsDTOArray;
    }
}
