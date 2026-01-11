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
public class SpecialProgrammes {
    @Id
    private String studentID;
    private String month;
    private String programmeName;
    private double marks;
}
