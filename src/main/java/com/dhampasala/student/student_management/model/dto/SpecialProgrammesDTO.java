package com.dhampasala.student.student_management.model.dto;
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
public class SpecialProgrammesDTO {
      private String studentID;
    private String month;
    private String programmeName;
    private double marks;
}
