package com.dhampasala.student.student_management.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dhampasala.student.student_management.model.entity.Rank;

public interface RankRepo extends JpaRepository<Rank, String>{
  
}
