package com.dhampasala.student.student_management.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dhampasala.student.student_management.model.entity.PersonalInfo;

public interface PersonalInfoRepo extends JpaRepository<PersonalInfo, String>{
  
}
