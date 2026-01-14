package com.dhampasala.student.student_management.model.dto;

import java.util.Date;
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
    private Date birthDate;
    private Date addmissionDate;
    private int grade;
    private String phoneNo;
    private String whatsAppNo;
    private String address;    
    private String guardianName;
    private String guardianNIC;
    private String occupation;
    private String futureGoal;
}
