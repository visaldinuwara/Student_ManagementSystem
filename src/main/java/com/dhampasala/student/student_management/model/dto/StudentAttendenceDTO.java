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
public class StudentAttendenceDTO {
      private String studentId;
    private int year;
    private String month;
    private int daysPresent;
}
