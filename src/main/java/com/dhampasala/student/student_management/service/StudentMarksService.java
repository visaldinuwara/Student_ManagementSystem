package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhampasala.student.student_management.model.dto.StudentMarksDTO;
import com.dhampasala.student.student_management.model.entity.StudentMarks;
import com.dhampasala.student.student_management.repository.StudentMarksRepo;

public class StudentMarksService {
    @Autowired
    private StudentMarksRepo studentMarksRepo;
    private void addStudentMarks(StudentMarksDTO studentMarksDTO){
        studentMarksRepo.addStudentMarks(new StudentMarks(studentMarksDTO.getStudentID(),studentMarksDTO.getFirstTerm(),studentMarksDTO.getSecondTerm(),studentMarksDTO.getThirdTerm(),studentMarksDTO.getDepartmentExam(),studentMarksDTO.getEnglishMediumExam(),studentMarksDTO.getRankFirstTerm(),studentMarksDTO.getRankSecondTerm(),studentMarksDTO.getRankThirdTerm(),studentMarksDTO.getRankDepartmentExam(),studentMarksDTO.getRankEnglishMediumExam()));
    }
    private void updateStudentMarks(StudentMarksDTO studentMarksDTO) {
        studentMarksRepo.updateStudentMarks(new StudentMarks(studentMarksDTO.getStudentID(),studentMarksDTO.getFirstTerm(),studentMarksDTO.getSecondTerm(),studentMarksDTO.getThirdTerm(),studentMarksDTO.getDepartmentExam(),studentMarksDTO.getEnglishMediumExam(),studentMarksDTO.getRankFirstTerm(),studentMarksDTO.getRankSecondTerm(),studentMarksDTO.getRankThirdTerm(),studentMarksDTO.getRankDepartmentExam(),studentMarksDTO.getRankEnglishMediumExam()));
    }
    private void deleteStudentMarks(StudentMarksDTO studentMarksDTO){
        studentMarksRepo.deleteStudentMarks(new StudentMarks(studentMarksDTO.getStudentID(),studentMarksDTO.getFirstTerm(),studentMarksDTO.getSecondTerm(),studentMarksDTO.getThirdTerm(),studentMarksDTO.getDepartmentExam(),studentMarksDTO.getEnglishMediumExam(),studentMarksDTO.getRankFirstTerm(),studentMarksDTO.getRankSecondTerm(),studentMarksDTO.getRankThirdTerm(),studentMarksDTO.getRankDepartmentExam(),studentMarksDTO.getRankEnglishMediumExam()));
    }
    private StudentMarksDTO studentMarksDTO(String studentId){
        StudentMarks studentMarks=studentMarksRepo.searchStudentMarks(studentId);
        return new StudentMarksDTO(studentMarks.getStudentID(),studentMarks.getFirstTerm(),studentMarks.getSecondTerm(),studentMarks.getThirdTerm(),studentMarks.getDepartmentExam(),studentMarks.getEnglishMediumExam(),studentMarks.getRankFirstTerm(),studentMarks.getRankSecondTerm(),studentMarks.getRankThirdTerm(),studentMarks.getRankDepartmentExam(),studentMarks.getRankEnglishMediumExam());
    }
    private List<StudentMarksDTO> getAll(){
        List<StudentMarks> studentMarksArray=studentMarksRepo.getAll();
        List<StudentMarksDTO> studentMarksDTOArray=new ArrayList<>();
        for(StudentMarks studentMarks:studentMarksArray){
            studentMarksDTOArray.add(new StudentMarksDTO(studentMarks.getStudentID(),studentMarks.getFirstTerm(),studentMarks.getSecondTerm(),studentMarks.getThirdTerm(),studentMarks.getDepartmentExam(),studentMarks.getEnglishMediumExam(),studentMarks.getRankFirstTerm(),studentMarks.getRankSecondTerm(),studentMarks.getRankThirdTerm(),studentMarks.getRankDepartmentExam(),studentMarks.getRankEnglishMediumExam()));
        }
        return studentMarksDTOArray;
    }
}
