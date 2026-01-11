package com.dhampasala.student.student_management.model.entity;
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
public class OtherDetails {
      @Id
    private String studentId;
    private String guardianName;
    private String guardianNIC;
    private String occupation;
    private String futureGoal;
}
