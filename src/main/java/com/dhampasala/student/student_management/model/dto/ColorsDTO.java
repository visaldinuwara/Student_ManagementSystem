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
public class ColorsDTO {
    private String studentID;
    private double dinisuru;
    private double ransilu;
    private double praknapradeepa;
    private double sisumini;
    private double svarnavarna;
    private double svarnabushana;
}
