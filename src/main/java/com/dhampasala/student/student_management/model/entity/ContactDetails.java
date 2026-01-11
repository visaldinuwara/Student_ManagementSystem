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
public class ContactDetails {
  @Id
      private String studentId;
    private String phoneNo;
    private String whatsAppNo;
    private String address;
}
