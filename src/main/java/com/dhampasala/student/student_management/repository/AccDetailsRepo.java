package com.dhampasala.student.student_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dhampasala.student.student_management.model.entity.AccDetails;

public interface AccDetailsRepo extends JpaRepository<AccDetails, String>{
  
}
