package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhampasala.student.student_management.model.dto.ContactDetailsDTO;
import com.dhampasala.student.student_management.model.entity.ContactDetails;
import com.dhampasala.student.student_management.repository.ContactDetailsRepo;

public class ContactDetailsService {
  @Autowired
  ContactDetailsRepo contactDetailsRepo;
      private void addContactDetail(ContactDetailsDTO contactDetailsDTO){
        contactDetailsRepo.addContactDetail(new ContactDetails(contactDetailsDTO.getStudentId(),contactDetailsDTO.getPhoneNo(),contactDetailsDTO.getAddress(),contactDetailsDTO.getAddress()));
    }
    private void updateContactDetails(ContactDetailsDTO contactDetailsDTO) {
        contactDetailsRepo.updateContactDetail(new ContactDetails(contactDetailsDTO.getStudentId(),contactDetailsDTO.getPhoneNo(),contactDetailsDTO.getAddress(),contactDetailsDTO.getAddress()));
    }
    private void deleteContactDetails(ContactDetailsDTO contactDetailsDTO){
        contactDetailsRepo.deleteContactDetail(new ContactDetails(contactDetailsDTO.getStudentId(),contactDetailsDTO.getPhoneNo(),contactDetailsDTO.getAddress(),contactDetailsDTO.getAddress()));
    }
    private ContactDetailsDTO searchContactDetails(String studentId){
        ContactDetails contactDetails=contactDetailsRepo.searchContactDetail(studentId);
        return new ContactDetailsDTO(contactDetails.getStudentId(),contactDetails.getPhoneNo(),contactDetails.getWhatsAppNo(),contactDetails.getWhatsAppNo());
    }
    private List<ContactDetailsDTO> getAll(){
        List<ContactDetails>contactDetailsArray=contactDetailsRepo.getAll();
        List<ContactDetailsDTO>contactDetailsDTOArray=new ArrayList<>();
        for(ContactDetails contactDetails:contactDetailsArray){
            contactDetailsDTOArray.add(new ContactDetailsDTO(contactDetails.getStudentId(),contactDetails.getPhoneNo(),contactDetails.getWhatsAppNo(),contactDetails.getAddress()));
        }
        return contactDetailsDTOArray;
    }
}
