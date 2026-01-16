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
@Table(name = "`colors`")
public class Colors {
      @Id
    private String studentID;
    private double dinisuru;
    private double ransilu;
    private double praknapradeepa;
    private double sisumini;
    private double svarnavarna;
    private double svarnabushana;
}
