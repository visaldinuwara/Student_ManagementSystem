package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.ColorsDTO;
import com.dhampasala.student.student_management.model.entity.Colors;
import com.dhampasala.student.student_management.repository.ColorsRepository;
@Service
public class ColorsService {
      @Autowired
    private ColorsRepository colorsRepo;
    public void addColors(ColorsDTO colorsDTO){
        colorsRepo.save(new Colors(colorsDTO.getStudentID(),colorsDTO.isDinisuru(),colorsDTO.isRansilu(),colorsDTO.isPraknapradeepa(),colorsDTO.isSisumini(),colorsDTO.isSvarnavarna(),colorsDTO.isSvarnabushana(),colorsDTO.getTotalMarks()));
    }
    public void updateColors(ColorsDTO colorsDTO){
        colorsRepo.save(new Colors(colorsDTO.getStudentID(),colorsDTO.isDinisuru(),colorsDTO.isRansilu(),colorsDTO.isPraknapradeepa(),colorsDTO.isSisumini(),colorsDTO.isSvarnavarna(),colorsDTO.isSvarnabushana(),colorsDTO.getTotalMarks()));
    }
    public void deleteColors(String studentId){
        colorsRepo.deleteById(studentId);
    }
    public Optional<ColorsDTO> searchColors(String studentId){
    return colorsRepo.findById(studentId)
            .map(dto -> new ColorsDTO(
                dto.getStudentID(),
                dto.isDinisuru(),
                dto.isRansilu(),
                dto.isPraknapradeepa(),
                dto.isSisumini(),
                dto.isSvarnavarna(),
                dto.isSvarnabushana(),
                dto.getTotalMarks()
            ));
}        
    public List<ColorsDTO> getAll(){
        List<ColorsDTO> colorDtoArray=new ArrayList<>();
        List<Colors> colorArray=colorsRepo.findAll();
        for(Colors colors:colorArray){
            colorDtoArray.add(new ColorsDTO(colors.getStudentID(),colors.isDinisuru(),colors.isRansilu(),colors.isPraknapradeepa(),colors.isSisumini(),colors.isSvarnavarna(),colors.isSvarnabushana(),colors.getTotalMarks()));
        }
        return colorDtoArray;
    }

}
