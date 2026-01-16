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
@Table(name = "`student_marks`")
public class StudentMarks {
      @Id
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
