package com.dhampasala.student.student_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dhampasala.student.student_management.model.entity.ExternalMarks;

public interface ExternalMarksRepo extends JpaRepository<ExternalMarks, String>{
  
}
