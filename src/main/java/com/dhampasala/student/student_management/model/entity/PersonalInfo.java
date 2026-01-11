package com.dhampasala.student.student_management.model.entity;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
public class PersonalInfo {
      @Id
    private String studentId;
    private String fullName;
    private Date birthDate;
    private Date addmissionDate;
    private int grade;
}
