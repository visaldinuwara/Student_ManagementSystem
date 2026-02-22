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
public class ColorsDTO {
    private String studentID;
    private boolean dinisuru;
    private boolean ransilu;
    private boolean praknapradeepa;
    private boolean sisumini;
    private boolean svarnavarna;
    private boolean svarnabushana;
    private double totalMarks;
}
