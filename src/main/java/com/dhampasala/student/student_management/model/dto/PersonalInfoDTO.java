package com.dhampasala.student.student_management.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PersonalInfoDTO {
    private String fullName;
    private String birthDate;
    private String addmissionDate;
    private int grade;
    private String phoneNo;
    private String whatsAppNo;
    private String address;    
    private String guardianName;
    private String guardianNIC;
    private String occupation;
    private String futureGoal;
    private Boolean medium;
}
