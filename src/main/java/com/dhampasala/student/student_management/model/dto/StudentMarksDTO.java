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
public class StudentMarksDTO {
     private String studentID;
    private double firstTerm;
    private double secondTerm;
    private double thirdTerm;
    private double departmentExam;
    private double englishMediumExam;
    private int rankFirstTerm;
    private int rankSecondTerm;
    private int rankThirdTerm;
    private int rankDepartmentExam;
    private int rankEnglishMediumExam;
}
