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
@Table(name = "`external_activities`")
public class ExternalActivities {
      @Id
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
