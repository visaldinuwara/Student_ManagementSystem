package com.dhampasala.student.student_management.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Entity
@Table(name = "`personal_info`")
public class PersonalInfo {
      @Id
    private String studentId;
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
}
