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
public class ContactDetailsDTO {
    private String studentId;
    private String phoneNo;
    private String whatsAppNo;
    private String address;
}
