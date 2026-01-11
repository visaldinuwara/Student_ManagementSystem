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
public class ExternalActivitiesDTO {
    private String studentId;
    private boolean katinaPerahara;
    private boolean buddhaPooja;
    private boolean danaya;
    private boolean bakthiGeetha;
    private boolean paaliDay;
    private boolean englishDay;
    private boolean concert;
    private String other;
    private double marks;
}
