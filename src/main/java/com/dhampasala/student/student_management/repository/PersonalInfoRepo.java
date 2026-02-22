package com.dhampasala.student.student_management.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dhampasala.student.student_management.model.entity.PersonalInfo;

public interface PersonalInfoRepo extends JpaRepository<PersonalInfo, String>{

@Query(value = "SELECT student_id FROM personal_info ORDER BY student_id DESC LIMIT 1", nativeQuery = true)
String findLastStudentId();
}
