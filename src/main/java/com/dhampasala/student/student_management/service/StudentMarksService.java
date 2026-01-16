package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.StudentMarksDTO;
import com.dhampasala.student.student_management.model.entity.StudentMarks;
import com.dhampasala.student.student_management.repository.StudentMarksRepo;
@Service
public class StudentMarksService {
    @Autowired
    private StudentMarksRepo studentMarksRepo;
    public void addStudentMarks(StudentMarksDTO studentMarksDTO){
        studentMarksRepo.save(new StudentMarks(studentMarksDTO.getStudentID(),studentMarksDTO.getFirstTerm(),studentMarksDTO.getSecondTerm(),studentMarksDTO.getThirdTerm(),studentMarksDTO.getDepartmentExam(),studentMarksDTO.getEnglishMediumExam(),studentMarksDTO.getRankFirstTerm(),studentMarksDTO.getRankSecondTerm(),studentMarksDTO.getRankThirdTerm(),studentMarksDTO.getRankDepartmentExam(),studentMarksDTO.getRankEnglishMediumExam()));
    }
    public void updateStudentMarks(StudentMarksDTO studentMarksDTO) {
        studentMarksRepo.save(new StudentMarks(studentMarksDTO.getStudentID(),studentMarksDTO.getFirstTerm(),studentMarksDTO.getSecondTerm(),studentMarksDTO.getThirdTerm(),studentMarksDTO.getDepartmentExam(),studentMarksDTO.getEnglishMediumExam(),studentMarksDTO.getRankFirstTerm(),studentMarksDTO.getRankSecondTerm(),studentMarksDTO.getRankThirdTerm(),studentMarksDTO.getRankDepartmentExam(),studentMarksDTO.getRankEnglishMediumExam()));
    }
    public void deleteStudentMarks(StudentMarksDTO studentMarksDTO){
        studentMarksRepo.delete(new StudentMarks(studentMarksDTO.getStudentID(),studentMarksDTO.getFirstTerm(),studentMarksDTO.getSecondTerm(),studentMarksDTO.getThirdTerm(),studentMarksDTO.getDepartmentExam(),studentMarksDTO.getEnglishMediumExam(),studentMarksDTO.getRankFirstTerm(),studentMarksDTO.getRankSecondTerm(),studentMarksDTO.getRankThirdTerm(),studentMarksDTO.getRankDepartmentExam(),studentMarksDTO.getRankEnglishMediumExam()));
    }
    public Optional<StudentMarksDTO> searchStudentMarks(String studentId){
        return studentMarksRepo.findById(studentId).map(dto -> new StudentMarksDTO(dto.getStudentID(),dto.getFirstTerm(),dto.getSecondTerm(),dto.getThirdTerm(),dto.getDepartmentExam(),dto.getEnglishMediumExam(),dto.getRankFirstTerm(),dto.getRankSecondTerm(),dto.getRankThirdTerm(),dto.getRankDepartmentExam(),dto.getRankEnglishMediumExam()));
    }
    public List<StudentMarksDTO> getAll(){
        List<StudentMarks> studentMarksArray=studentMarksRepo.findAll();
        List<StudentMarksDTO> studentMarksDTOArray=new ArrayList<>();
        for(StudentMarks studentMarks:studentMarksArray){
            studentMarksDTOArray.add(new StudentMarksDTO(studentMarks.getStudentID(),studentMarks.getFirstTerm(),studentMarks.getSecondTerm(),studentMarks.getThirdTerm(),studentMarks.getDepartmentExam(),studentMarks.getEnglishMediumExam(),studentMarks.getRankFirstTerm(),studentMarks.getRankSecondTerm(),studentMarks.getRankThirdTerm(),studentMarks.getRankDepartmentExam(),studentMarks.getRankEnglishMediumExam()));
        }
        return studentMarksDTOArray;
    }
}
