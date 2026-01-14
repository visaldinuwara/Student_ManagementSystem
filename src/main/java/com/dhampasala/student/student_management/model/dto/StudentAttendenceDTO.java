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
public class StudentAttendenceDTO {
      private String studentId;
    private int year;
    private String month;
    private int daysPresent;
}
