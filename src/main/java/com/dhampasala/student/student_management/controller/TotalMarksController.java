package com.dhampasala.student.student_management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhampasala.student.student_management.model.dto.TotalMarksDTO;
import com.dhampasala.student.student_management.service.TotalMarksService;

@RestController
@RequestMapping("/totalMarks")
@CrossOrigin(origins = "*")
public class TotalMarksController {
  @Autowired
  private TotalMarksService totalMarksService;
   @PostMapping("/save")
  public void addTotalMarks(@RequestBody TotalMarksDTO totalMarksDTO) {
    totalMarksService.addTotalMarks(totalMarksDTO);
  }

  @PostMapping("/update")
  public void updateTotalMarks(@RequestBody TotalMarksDTO totalMarksDTO) {
    totalMarksService.updateTotalmarks(totalMarksDTO);
  }

  @PostMapping("/delete/{studentId}")
  public void deleteTotalMarks(@PathVariable String studentId) {
    totalMarksService.deleteTotalMarks(studentId);
  }

  @GetMapping("/search/{studentId}")
  public Optional<TotalMarksDTO> searchTotalMarks(@PathVariable String studentId) {
    return totalMarksService.searchTotalMarks(studentId);
  }

  @GetMapping("/all")
  public List<TotalMarksDTO> getAll() {
    return totalMarksService.getAll();
  }

  @DeleteMapping("/bulk-delete")
  public ResponseEntity<String> bulkDelete(@RequestBody List<String> studentIds) {
    try {
      totalMarksService.deleteMultipleRecords(studentIds);
      return ResponseEntity.ok("Successfully deleted " + studentIds.size() + " records.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Error during bulk deletion: " + e.getMessage());
    }
  }
}
