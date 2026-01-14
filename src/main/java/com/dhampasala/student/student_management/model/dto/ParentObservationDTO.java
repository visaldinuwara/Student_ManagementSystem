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
public class ParentObservationDTO {
    private String studentId;
    private double firstTerm;
    private double secondTerm;
    private double thirdTerm;
}
