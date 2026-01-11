package com.dhampasala.student.student_management.model.dto;

import java.util.Date;
import jakarta.persistence.Entity;
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
public class PersonalInfoDTO {
    private String fullName;
    private Date birthDate;
    private Date addmissionDate;
    private int grade;
}
